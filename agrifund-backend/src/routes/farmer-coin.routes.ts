import { Router, Request, Response } from 'express';
import { SuiService } from '../services/sui.service';
import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types';
import { RequestHandler as ExpressHandler } from 'express-serve-static-core';

const supabase = createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
);

const router = Router();

// Type definitions
interface CreateFarmerCoinRequest {
    farmer_id: string;
    loan_pool_id: string;
    investor_id: string;
    amount: number;
}

type RequestHandler<P = any> = ExpressHandler<P, any, any, any>;

// Create/Mint farmer coin
const createFarmerCoin: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const { farmer_id, loan_pool_id, investor_id, amount } = req.body as CreateFarmerCoinRequest;

        // Validate required fields
        if (!farmer_id || !loan_pool_id || !investor_id || !amount) {
            res.status(400).json({ 
                error: 'Required fields missing' 
            });
            return;
        }

        // 1. First check if loan pool exists and is active
        const { data: loanPool, error: loanPoolError } = await supabase
            .from('loan_pools')
            .select('*')
            .eq('id', loan_pool_id)
            .single();
        if (loanPoolError || !loanPool) {
            res.status(404).json({ 
                error: 'Loan pool not found' 
            });
            return;
        }

        // 2. Mint farmer coin on blockchain
        const suiService = new SuiService(process.env.SUI_ADMIN_SECRET_KEY!);
        const blockchainResult = await suiService.mintFarmerCoin(
            loanPool.blockchain_id, // Use blockchain ID from loan pool
            Number(amount)
        );

        // 3. Store in database
        const { data: farmerCoin, error: dbError } = await supabase
            .from('farmer_coins')
            .insert({
                farmer_id,
                loan_pool_id,
                investor_id,
                amount,
                blockchain_id: blockchainResult.effects?.created?.[0]?.reference?.objectId,
                created_at: new Date().toISOString()
            })
            .select('*, loan_pools(*), users!farmer_id(*)')
            .single();

        if (dbError) throw dbError;

        // 4. Update loan pool current amount
        const { error: updateError } = await supabase
            .from('loan_pools')
            .update({ 
                current_amount: loanPool.current_amount + Number(amount),
                status: loanPool.current_amount + Number(amount) >= loanPool.goal_amount 
                    ? 'fulfilled' 
                    : 'active'
            })
            .eq('id', loan_pool_id);

        if (updateError) throw updateError;

        res.status(201).json({
            message: 'Farmer coin created successfully',
            data: farmerCoin,
            blockchain_data: blockchainResult
        });

    } catch (err: any) {
        next(err);
    }
};

// Get farmer coins by investor
const getFarmerCoinsByInvestor: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const { investor_id } = req.params;
        
        const { data, error } = await supabase
            .from('farmer_coins')
            .select(`
                *,
                loan_pools (*),
                farmers:users!farmer_id (*),
                investors:users!investor_id (*)
            `)
            .eq('investor_id', investor_id)
            .order('created_at', { ascending: false });

        if (error) throw error;

        res.json({
            message: 'Farmer coins retrieved successfully',
            data
        });

    } catch (err: any) {
        next(err);
    }
};

// Get farmer coins by farmer
const getFarmerCoinsByFarmer: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const { farmer_id } = req.params;
        
        const { data, error } = await supabase
            .from('farmer_coins')
            .select(`
                *,
                loan_pools (*),
                investors:users!investor_id (*)
            `)
            .eq('farmer_id', farmer_id)
            .order('created_at', { ascending: false });

        if (error) throw error;

        res.json({
            message: 'Farmer coins retrieved successfully',
            data
        });

    } catch (err: any) {
        next(err);
    }
};

// Get farmer coin details
const getFarmerCoinDetails: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const { id } = req.params;
        
        const { data, error } = await supabase
            .from('farmer_coins')
            .select(`
                *,
                loan_pools (*),
                farmers:users!farmer_id (*),
                investors:users!investor_id (*)
            `)
            .eq('id', id)
            .single();

        if (error) throw error;
        
        res.json({
            message: 'Farmer coin details retrieved successfully',
            data
        });

    } catch (err: any) {
        next(err);
    }
};

// Get total investment amount by farmer
const getTotalInvestment: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const { farmer_id } = req.params;
        
        const { data, error } = await supabase
            .from('farmer_coins')
            .select('amount')
            .eq('farmer_id', farmer_id);

        if (error) throw error;

        const total = data.reduce((sum, coin) => sum + Number(coin.amount), 0);
        
        res.json({
            message: 'Total investment retrieved successfully',
            total,
            count: data.length
        });

    } catch (err: any) {
        next(err);
    }
};

// Route definitions
router.post('/create', createFarmerCoin);
router.get('/investor/:investor_id', getFarmerCoinsByInvestor);
router.get('/farmer/:farmer_id', getFarmerCoinsByFarmer);
router.get('/:id', getFarmerCoinDetails);
router.get('/total/farmer/:farmer_id', getTotalInvestment);

export default router; 