module agrifund::farmer_coin {
    use sui::object::{Self, UID, ID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::balance::{Self, Balance};
    use sui::event;
    use agrifund::loan_pool::{Self, LoanPool};

    // Events
    struct FarmerCoinMinted has copy, drop {
        coin_id: ID,
        farmer: address,
        investor: address,
        amount: u64,
        pool_id: ID
    }

    // FarmerCoin struct
    struct FarmerCoin has key {
        id: UID,
        farmer: address,
        pool_id: ID,
        investor: address,
        amount: u64,
        created_at: u64
    }

    // Mint farmer coins when investment is made
    public entry fun mint_farmer_coin(
        pool: &LoanPool,
        amount: u64,
        ctx: &mut TxContext
    ) {
        let farmer_coin = FarmerCoin {
            id: object::new(ctx),
            farmer: loan_pool::get_farmer(pool),
            pool_id: loan_pool::get_pool_id(pool),
            investor: tx_context::sender(ctx),
            amount,
            created_at: tx_context::epoch(ctx)
        };

        event::emit(FarmerCoinMinted {
            coin_id: object::uid_to_inner(&farmer_coin.id),
            farmer: loan_pool::get_farmer(pool),
            investor: tx_context::sender(ctx),
            amount,
            pool_id: loan_pool::get_pool_id(pool)
        });

        transfer::transfer(farmer_coin, tx_context::sender(ctx));
    }
} 