module agrifund::loan_pool {
    use sui::object::{Self, UID, ID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::balance::{Self, Balance};
    use sui::event;

    // Errors
    const E_INSUFFICIENT_FUNDS: u64 = 0;
    const E_POOL_NOT_ACTIVE: u64 = 1;
    const E_INVALID_AMOUNT: u64 = 2;
    const E_UNAUTHORIZED: u64 = 3;

    // Pool status
    const STATUS_PENDING: u8 = 0;
    const STATUS_ACTIVE: u8 = 1;
    const STATUS_FULFILLED: u8 = 2;
    const STATUS_CLOSED: u8 = 3;

    // Events
    struct LoanPoolCreated has copy, drop {
        pool_id: ID,
        farmer: address,
        goal_amount: u64,
        title: vector<u8>,
        description: vector<u8>
    }

    struct LoanPoolStatusChanged has copy, drop {
        pool_id: ID,
        old_status: u8,
        new_status: u8
    }

    // Main LoanPool struct
    struct LoanPool has key {
        id: UID,
        farmer: address,
        title: vector<u8>,
        description: vector<u8>,
        goal_amount: u64,
        current_amount: u64,
        status: u8,
        balance: Balance<SUI>,
        created_at: u64
    }

    // Create a new loan pool
    public entry fun create_loan_pool(
        farmer: address,
        title: vector<u8>,
        description: vector<u8>,
        goal_amount: u64,
        ctx: &mut TxContext
    ) {
        assert!(goal_amount > 0, E_INVALID_AMOUNT);

        let pool = LoanPool {
            id: object::new(ctx),
            farmer,
            title,
            description,
            goal_amount,
            current_amount: 0,
            status: STATUS_PENDING,
            balance: balance::zero(),
            created_at: tx_context::epoch(ctx)
        };

        event::emit(LoanPoolCreated {
            pool_id: object::uid_to_inner(&pool.id),
            farmer,
            goal_amount,
            title,
            description
        });

        transfer::share_object(pool);
    }

    // Activate pool
    public entry fun activate_pool(
        pool: &mut LoanPool,
        ctx: &TxContext
    ) {
        assert!(tx_context::sender(ctx) == pool.farmer, E_UNAUTHORIZED);
        assert!(pool.status == STATUS_PENDING, E_POOL_NOT_ACTIVE);

        let old_status = pool.status;
        pool.status = STATUS_ACTIVE;

        event::emit(LoanPoolStatusChanged {
            pool_id: object::uid_to_inner(&pool.id),
            old_status,
            new_status: STATUS_ACTIVE
        });
    }

    // Getters
    public fun get_status(pool: &LoanPool): u8 { pool.status }
    public fun get_goal_amount(pool: &LoanPool): u64 { pool.goal_amount }
    public fun get_current_amount(pool: &LoanPool): u64 { pool.current_amount }
    public fun get_farmer(pool: &LoanPool): address { pool.farmer }

    // Add getter for pool ID
    public fun get_pool_id(pool: &LoanPool): ID {
        object::uid_to_inner(&pool.id)
    }

    // In loan_pool.move, add this function:
    public fun add_investment(pool: &mut LoanPool, payment: Balance<SUI>) {
        // Get payment value before joining balances
        let payment_value = balance::value(&payment);
        
        // Update pool state
        update_current_amount(pool, payment_value);
        
        // Join balances after getting the value
        balance::join(&mut pool.balance, payment);
    }

    // Add function to update current amount
    public(friend) fun update_current_amount(pool: &mut LoanPool, amount: u64) {
        pool.current_amount = pool.current_amount + amount;
        if (pool.current_amount >= pool.goal_amount) {
            pool.status = STATUS_FULFILLED;
        }
    }
} 