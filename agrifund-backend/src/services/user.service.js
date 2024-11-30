import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { supabase, config } from '../config/config.js';
import { AppError } from '../middleware/errorHandler.js';

export class UserService {
    // Create new user with Sui wallet
    async createUser(userData) {
        try {
            // Generate Sui keypair for user
            const keypair = new Ed25519Keypair();
            const walletAddress = keypair.getPublicKey().toSuiAddress();

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const password_hash = await bcrypt.hash(userData.password, salt);

            // Prepare profile data with wallet info
            const profile_data = {
                ...userData.profile_data,
                wallet: {
                    address: walletAddress,
                    created_at: new Date().toISOString()
                }
            };

            // Create user in database
            const { data: user, error } = await supabase
                .from('users')
                .insert({
                    email: userData.email,
                    password_hash,
                    name: userData.name,
                    role: userData.role,
                    profile_data,
                    created_at: new Date().toISOString()
                })
                .select()
                .single();

            if (error) {
                console.error('Database error:', error);
                throw new AppError(`Failed to create user: ${error.message}`, 400);
            }

            // Generate JWT token
            const token = jwt.sign(
                { userId: user.id, role: user.role },
                config.jwtSecret,
                { expiresIn: '24h' }
            );

            return {
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    name: user.name,
                    wallet_address: walletAddress // Return from generated data
                },
                token,
                wallet: {
                    address: walletAddress,
                    privateKey: keypair.export().privateKey
                }
            };
        } catch (error) {
            console.error('Create user error:', error);
            throw error instanceof AppError ? error : new AppError(`Failed to create user: ${error.message}`, 500);
        }
    }

    // Login user
    async loginUser(email, password) {
        try {
            // Get user from database
            const { data: user, error } = await supabase
                .from('users')
                .select('*')
                .eq('email', email)
                .single();

            if (error || !user) {
                throw new AppError('Invalid email or password', 401);
            }

            // Check password
            const isValidPassword = await bcrypt.compare(password, user.password_hash);
            if (!isValidPassword) {
                throw new AppError('Invalid email or password', 401);
            }

            // Generate JWT token
            const token = jwt.sign(
                { userId: user.id, role: user.role },
                config.jwtSecret,
                { expiresIn: '24h' }
            );

            return {
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    name: user.name,
                    wallet_address: user.profile_data?.wallet?.address
                },
                token
            };
        } catch (error) {
            throw error instanceof AppError ? error : new AppError(`Failed to login: ${error.message}`, 500);
        }
    }

    // Get user profile
    async getUserProfile(userId) {
        try {
            const { data: user, error } = await supabase
                .from('users')
                .select('id, email, role, name, profile_data')
                .eq('id', userId)
                .single();

            if (error || !user) {
                throw new AppError('User not found', 404);
            }

            return {
                ...user,
                wallet_address: user.profile_data?.wallet?.address
            };
        } catch (error) {
            throw error instanceof AppError ? error : new AppError('Failed to get user profile', 500);
        }
    }
}
