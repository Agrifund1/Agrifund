import { createClient } from '@supabase/supabase-js';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { suiClient } from '../config/sui.config';
import crypto from 'crypto';

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
);

export class WalletService {
    // Connect a new wallet
    async connectWallet(userId: string, walletAddress: string, walletType: 'sui_wallet' | 'imported') {
        // Check if wallet already exists
        const { data: existingWallet } = await supabase
            .from('user_wallets')
            .select()
            .eq('wallet_address', walletAddress)
            .single();

        if (existingWallet) {
            throw new Error('Wallet already connected to an account');
        }

        // Generate verification code
        const verificationCode = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 1); // Expires in 1 hour

        // Create verification record
        const { error: verificationError } = await supabase
            .from('wallet_verifications')
            .insert({
                user_id: userId,
                wallet_address: walletAddress,
                verification_code: verificationCode,
                expires_at: expiresAt.toISOString(),
                status: 'pending'
            });

        if (verificationError) throw verificationError;

        return { verificationCode };
    }

    // Verify wallet ownership
    async verifyWallet(userId: string, walletAddress: string, signedMessage: string) {
        // Get pending verification
        const { data: verification, error: verificationError } = await supabase
            .from('wallet_verifications')
            .select()
            .eq('user_id', userId)
            .eq('wallet_address', walletAddress)
            .eq('status', 'pending')
            .single();

        if (verificationError || !verification) {
            throw new Error('No pending verification found');
        }

        // Verify the signature (implement your verification logic here)
        const isValid = await this.verifySignature(
            verification.verification_code,
            signedMessage,
            walletAddress
        );

        if (!isValid) {
            throw new Error('Invalid signature');
        }

        // Update verification status
        await supabase
            .from('wallet_verifications')
            .update({
                status: 'completed',
                verified_at: new Date().toISOString()
            })
            .eq('id', verification.id);

        // Add wallet to user_wallets
        const { error: walletError } = await supabase
            .from('user_wallets')
            .insert({
                user_id: userId,
                wallet_address: walletAddress,
                wallet_type: 'sui_wallet',
                is_verified: true,
                verification_date: new Date().toISOString()
            });

        if (walletError) throw walletError;

        return { status: 'success' };
    }

    // Set primary wallet
    async setPrimaryWallet(userId: string, walletAddress: string) {
        // Start transaction
        const { error: updateError } = await supabase
            .from('user_wallets')
            .update({ is_primary: false })
            .eq('user_id', userId);

        if (updateError) throw updateError;

        const { error: setPrimaryError } = await supabase
            .from('user_wallets')
            .update({ is_primary: true })
            .eq('user_id', userId)
            .eq('wallet_address', walletAddress);

        if (setPrimaryError) throw setPrimaryError;

        return { status: 'success' };
    }

    // Get user wallets
    async getUserWallets(userId: string) {
        const { data: wallets, error } = await supabase
            .from('user_wallets')
            .select('*')
            .eq('user_id', userId)
            .order('is_primary', { ascending: false });

        if (error) throw error;
        return wallets;
    }

    private async verifySignature(message: string, signedMessage: string, walletAddress: string): Promise<boolean> {
        // Implement signature verification logic here
        // This will depend on your specific requirements and the Sui SDK
        return true; // Placeholder
    }
} 