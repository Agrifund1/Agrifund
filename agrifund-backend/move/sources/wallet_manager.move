module agrifund::wallet_manager {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::event;

    // Events
    struct WalletLinked has copy, drop {
        user_id: address,
        wallet_address: address
    }

    struct WalletVerified has copy, drop {
        user_id: address,
        wallet_address: address,
        verification_date: u64
    }

    // Capability for managing wallets
    struct WalletManagerCap has key {
        id: UID
    }

    // User's wallet record
    struct UserWallet has key {
        id: UID,
        user_id: address,
        wallet_address: address,
        is_verified: bool,
        verification_date: u64
    }

    // Initialize the wallet manager
    fun init(ctx: &mut TxContext) {
        transfer::transfer(WalletManagerCap {
            id: object::new(ctx)
        }, tx_context::sender(ctx))
    }

    // Link a wallet to a user
    public entry fun link_wallet(
        _cap: &WalletManagerCap,
        user_id: address,
        wallet_address: address,
        ctx: &mut TxContext
    ) {
        let wallet = UserWallet {
            id: object::new(ctx),
            user_id,
            wallet_address,
            is_verified: false,
            verification_date: 0
        };

        event::emit(WalletLinked {
            user_id,
            wallet_address
        });

        transfer::share_object(wallet);
    }

    // Verify a wallet
    public entry fun verify_wallet(
        _cap: &WalletManagerCap,
        wallet: &mut UserWallet,
        ctx: &mut TxContext
    ) {
        assert!(!wallet.is_verified, 0); // Wallet not already verified
        
        wallet.is_verified = true;
        wallet.verification_date = tx_context::epoch(ctx);

        event::emit(WalletVerified {
            user_id: wallet.user_id,
            wallet_address: wallet.wallet_address,
            verification_date: wallet.verification_date
        });
    }
} 