import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { suiClient } from '../config/sui.config.js';
import { AppError } from '../middleware/errorHandler.js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export class WalletService {
    async connectWallet(userId, walletAddress, walletType) {
        try {
            // Validate wallet address format
            if (!this.isValidWalletAddress(walletAddress)) {
                throw new AppError('Invalid wallet address format', 400);
            }

            // Check if wallet already exists
            const { data: existingWallet, error: checkError } = await supabase
                .from('wallets')
                .select('*')
                .eq('address', walletAddress)
                .single();

            if (existingWallet) {
                throw new AppError('Wallet already connected to another account', 400);
            }

            // Create new wallet entry
            const { data: wallet, error } = await supabase
                .from('wallets')
                .insert({
                    user_id: userId,
                    address: walletAddress,
                    type: walletType,
                    is_primary: true
                })
                .select()
                .single();

            if (error) {
                throw new AppError(`Failed to connect wallet: ${error.message}`, 400);
            }

            return wallet;
        } catch (error) {
            throw error instanceof AppError ? error : new AppError('Failed to connect wallet', 500);
        }
    }

    async verifyWallet(userId, walletAddress, signedMessage) {
        try {
            // Verify the signed message
            const isValid = await this.verifySignature(walletAddress, signedMessage);
            if (!isValid) {
                throw new AppError('Invalid signature', 400);
            }

            // Update wallet verification status
            const { data: wallet, error } = await supabase
                .from('wallets')
                .update({ verified: true })
                .match({ user_id: userId, address: walletAddress })
                .select()
                .single();

            if (error) {
                throw new AppError(`Failed to verify wallet: ${error.message}`, 400);
            }

            return wallet;
        } catch (error) {
            throw error instanceof AppError ? error : new AppError('Failed to verify wallet', 500);
        }
    }

    async setPrimaryWallet(userId, walletAddress) {
        try {
            // First, set all user's wallets to non-primary
            await supabase
                .from('wallets')
                .update({ is_primary: false })
                .match({ user_id: userId });

            // Then set the specified wallet as primary
            const { data: wallet, error } = await supabase
                .from('wallets')
                .update({ is_primary: true })
                .match({ user_id: userId, address: walletAddress })
                .select()
                .single();

            if (error) {
                throw new AppError(`Failed to set primary wallet: ${error.message}`, 400);
            }

            return wallet;
        } catch (error) {
            throw error instanceof AppError ? error : new AppError('Failed to set primary wallet', 500);
        }
    }

    async getUserWallets(userId) {
        try {
            const { data: wallets, error } = await supabase
                .from('wallets')
                .select('*')
                .eq('user_id', userId);

            if (error) {
                throw new AppError(`Failed to get user wallets: ${error.message}`, 400);
            }

            return wallets;
        } catch (error) {
            throw error instanceof AppError ? error : new AppError('Failed to get user wallets', 500);
        }
    }

    // Helper methods
    isValidWalletAddress(address) {
        return /^0x[a-fA-F0-9]{64}$/.test(address);
    }

    async verifySignature(address, signedMessage) {
        try {
            // Implement signature verification logic here
            // This is a placeholder - implement proper verification in production
            return true;
        } catch (error) {
            throw new AppError('Failed to verify signature', 500);
        }
    }
}
