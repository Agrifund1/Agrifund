import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { AppError } from '../middleware/errorHandler.js';

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = [
    'SUPABASE_URL',
    'SUPABASE_KEY',
    'JWT_SECRET',
    'SUI_ADMIN_SECRET_KEY'
];

for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        throw new AppError(`Missing required environment variable: ${envVar}`, 500);
    }
}

// Create and export Supabase client
export const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Export environment variables
export const config = {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY,
    jwtSecret: process.env.JWT_SECRET,
    suiAdminSecretKey: process.env.SUI_ADMIN_SECRET_KEY,
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development'
};
