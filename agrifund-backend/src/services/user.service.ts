import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { CreateUserDTO, LoginDTO, User } from '../types/user.types';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
);

export class UserService {
    // Create new user with Sui wallet
    async createUser(userData: CreateUserDTO) {
        // Generate Sui keypair for user
        const keypair = new Ed25519Keypair();
        const walletAddress = keypair.getPublicKey().toSuiAddress();

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(userData.password, salt);

        // Store user in database
        const { data: user, error } = await supabase
            .from('users')
            .insert([
                {
                    email: userData.email,
                    password_hash,
                    name: userData.name,
                    role: userData.role,
                    wallet_address: walletAddress,
                    profile_data: userData.profile_data || {}
                }
            ])
            .select()
            .single();

        if (error) throw new Error(`Database error: ${error.message}`);

        // Generate encrypted wallet key for frontend
        const encryptedKey = this.encryptWalletKey(keypair.export().privateKey);

        return {
            user,
            wallet: {
                address: walletAddress,
                encryptedKey
            }
        };
    }

    // Login user
    async loginUser(credentials: LoginDTO) {
        // Get user from database
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', credentials.email)
            .single();

        if (error || !user) {
            throw new Error('Invalid credentials');
        }

        // Verify password
        const validPassword = await bcrypt.compare(
            credentials.password,
            user.password_hash
        );

        if (!validPassword) {
            throw new Error('Invalid credentials');
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET!,
            { expiresIn: '24h' }
        );

        return { user, token };
    }

    // Helper method to encrypt wallet key
    private encryptWalletKey(privateKey: string): string {
        // Implement encryption logic here
        // This is a placeholder - use proper encryption in production
        return Buffer.from(privateKey).toString('base64');
    }
} 