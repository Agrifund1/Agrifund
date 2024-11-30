export interface LoanPool {
    id: number;
    farmer_id: string;
    title: string;
    description: string;
    goal_amount: number;
    current_amount: number;
    status: 'active' | 'funded' | 'repaid' | 'defaulted';
    blockchain_id: string;
    created_at: string;
    updated_at: string;
}

export interface UserWallet {
    id: string;
    user_id: string;
    wallet_address: string;
    wallet_type: 'sui_wallet' | 'generated' | 'imported';
    is_primary: boolean;
    is_verified: boolean;
    verification_date: string | null;
    created_at: string;
}

export interface WalletVerification {
    id: string;
    user_id: string;
    wallet_address: string;
    verification_code: string;
    expires_at: string;
    verified_at: string | null;
    created_at: string;
    status: 'pending' | 'completed' | 'expired';
}

export interface Database {
    public: {
        Tables: {
            loan_pools: {
                Row: LoanPool;
                Insert: Omit<LoanPool, 'id' | 'updated_at'>;
                Update: Partial<Omit<LoanPool, 'id'>>;
            };
            user_wallets: {
                Row: UserWallet;
                Insert: Omit<UserWallet, 'id' | 'created_at'>;
                Update: Partial<Omit<UserWallet, 'id'>>;
            };
            wallet_verifications: {
                Row: WalletVerification;
                Insert: Omit<WalletVerification, 'id' | 'created_at'>;
                Update: Partial<Omit<WalletVerification, 'id'>>;
            };
        };
    };
} 