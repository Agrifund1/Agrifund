import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';

// Extend Express Request type to include user
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                role: string;
            };
        }
    }
}

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
);

export const authenticateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({
                status: 'error',
                message: 'No token provided'
            });
        }

        // Extract token
        const token = authHeader.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            userId: string;
            role: string;
        };

        // Check if user exists in database
        const { data: user, error } = await supabase
            .from('users')
            .select('id, role')
            .eq('id', decoded.userId)
            .single();

        if (error || !user) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid token'
            });
        }

        // Add user to request object
        req.user = {
            id: user.id,
            role: user.role
        };

        next();
    } catch (err) {
        return res.status(401).json({
            status: 'error',
            message: 'Invalid token'
        });
    }
}; 