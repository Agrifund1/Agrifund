module agrifund::invest {
    use sui::object::{Self, UID, ID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::balance::{Self, Balance};
    use sui::event;
    use agrifund::loan_pool::{Self, LoanPool};
    use agrifund::farmer_coin;

    // Errors
    const E_INSUFFICIENT_AMOUNT: u64 = 0;
    const E_POOL_NOT_ACTIVE: u64 = 1;
    const E_INVALID_PAYMENT: u64 = 2;

    // Events
    struct InvestmentMade has copy, drop {
        pool_id: ID,
        investor: address,
        amount: u64,
        transaction_hash: vector<u8>
    }

    // Investment record
    struct Investment has key {
        id: UID,
        pool_id: ID,
        investor: address,
        amount: u64,
        transaction_hash: vector<u8>,
        created_at: u64
    }

    // Make investment in a loan pool
    public entry fun invest_in_pool(
        pool: &mut LoanPool,
        payment: Coin<SUI>,
        amount: u64,
        transaction_hash: vector<u8>,
        ctx: &mut TxContext
    ) {
        // Verify pool is active
        assert!(loan_pool::get_status(pool) == 1, E_POOL_NOT_ACTIVE);
        assert!(amount > 0, E_INSUFFICIENT_AMOUNT);
        
        // Verify payment amount
        let payment_value = coin::value(&payment);
        assert!(payment_value >= amount, E_INVALID_PAYMENT);

        // Extract the exact amount needed
        let coin_to_invest = if (payment_value == amount) {
            payment
        } else {
            let split_coin = coin::split(&mut payment, amount, ctx);
            coin::destroy_zero(payment);
            split_coin
        };

        // Convert coin to balance
        let paid_balance = coin::into_balance(coin_to_invest);

        // Add investment to pool
        loan_pool::add_investment(pool, paid_balance);

        // Create investment record
        let investment = Investment {
            id: object::new(ctx),
            pool_id: loan_pool::get_pool_id(pool),
            investor: tx_context::sender(ctx),
            amount,
            transaction_hash,
            created_at: tx_context::epoch(ctx)
        };

        // Mint farmer coins
        farmer_coin::mint_farmer_coin(pool, amount, ctx);

        // Emit event
        event::emit(InvestmentMade {
            pool_id: loan_pool::get_pool_id(pool),
            investor: tx_context::sender(ctx),
            amount,
            transaction_hash
        });

        transfer::transfer(investment, tx_context::sender(ctx));
    }

    // Getter for investment amount
    public fun get_investment_amount(investment: &Investment): u64 {
        investment.amount
    }

    // Getter for investment pool ID
    public fun get_investment_pool_id(investment: &Investment): ID {
        investment.pool_id
    }
}