import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { supabase } from '../config/config.js';
import { AppError } from '../middleware/errorHandler.js';

const router = Router();

// Validation middleware
const validateLoanPool = [
    body('farmer_id').isUUID(),
    body('title').trim().notEmpty(),
    body('description').optional().trim(),
    body('goal_amount').isFloat({ min: 0 })
];

// Create loan pool
router.post('/create', validateLoanPool, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { farmer_id, title, description, goal_amount } = req.body;

        // Verify farmer exists
        const { data: farmer, error: farmerError } = await supabase
            .from('users')
            .select('id, role')
            .eq('id', farmer_id)
            .single();

        if (farmerError || !farmer) {
            throw new AppError('Farmer not found', 404);
        }

        if (farmer.role !== 'farmer') {
            throw new AppError('User is not a farmer', 400);
        }

        // Create loan pool
        const { data: loanPool, error } = await supabase
            .from('loan_pools')
            .insert({
                farmer_id,
                title,
                description,
                goal_amount,
                current_amount: 0,
                status: 'pending'
            })
            .select()
            .single();

        if (error) {
            console.error('Database error:', error);
            throw new AppError('Failed to create loan pool', 500);
        }

        res.status(201).json({
            status: 'success',
            data: {
                loanPool
            }
        });
    } catch (error) {
        next(error instanceof AppError ? error : new AppError(error.message, 500));
    }
});

// Get loan pool by ID
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        const { data: loanPool, error } = await supabase
            .from('loan_pools')
            .select(`
                *,
                farmer:farmer_id (
                    id,
                    name,
                    email
                )
            `)
            .eq('id', id)
            .single();

        if (error) {
            console.error('Database error:', error);
            throw new AppError('Failed to fetch loan pool', 500);
        }

        if (!loanPool) {
            throw new AppError('Loan pool not found', 404);
        }

        res.json({
            status: 'success',
            data: {
                loanPool
            }
        });
    } catch (error) {
        next(error instanceof AppError ? error : new AppError(error.message, 500));
    }
});

export default router;
