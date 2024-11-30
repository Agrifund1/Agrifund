import jwt from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';
import { AppError } from './errorHandler.js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export const authenticateUser = async (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            throw new AppError('No token provided', 401);
        }

        // Extract token
        const token = authHeader.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if user exists in database
        const { data: user, error } = await supabase
            .from('users')
            .select('id, role')
            .eq('id', decoded.userId)
            .single();

        if (error || !user) {
            throw new AppError('Invalid token', 401);
        }

        // Add user to request object
        req.user = {
            id: user.id,
            role: user.role
        };

        next();
    } catch (error) {
        next(error instanceof AppError ? error : new AppError(error.message, 401));
    }
};
