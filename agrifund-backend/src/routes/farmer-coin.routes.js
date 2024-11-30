import { Router } from 'express';
import { SuiService } from '../services/sui.service.js';
import { AppError } from '../middleware/errorHandler.js';
import { supabase } from '../config/config.js';

const router = Router();

// Initialize SuiService without parameters to use environment variable
let suiService;
try {
    suiService = new SuiService();
} catch (error) {
    console.error('Failed to initialize SuiService:', error);
    throw error;
}

// Create/Mint farmer coin
const createFarmerCoin = async (req, res, next) => {
    try {
        const { farmer_id, loan_pool_id, investor_id, amount } = req.body;
        
        // Validate required fields
        if (!farmer_id || !loan_pool_id || !amount) {
            throw new AppError('Required fields missing', 400);
        }

        // Validate UUIDs
        if (!isValidUUID(farmer_id) || !isValidUUID(loan_pool_id)) {
            throw new AppError('Invalid UUID format', 400);
        }

        // Check if farmer exists
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

        // Check if loan pool exists
        const { data: loanPool, error: loanPoolError } = await supabase
            .from('loan_pools')
            .select('id')
            .eq('id', loan_pool_id)
            .single();

        if (loanPoolError || !loanPool) {
            throw new AppError('Loan pool not found', 404);
        }

        // Record in database
        const { data: farmerCoin, error: insertError } = await supabase
            .from('farmer_coins')
            .insert({
                farmer_id,
                investor_id, // Optional
                loan_pool_id,
                amount: parseFloat(amount), // Convert to DECIMAL
                created_at: new Date().toISOString()
            })
            .select()
            .single();

        if (insertError) {
            console.error('Database error details:', insertError);
            throw new AppError('Failed to create farmer coin', 500);
        }

        res.status(201).json({
            status: 'success',
            data: {
                farmerCoin
            }
        });
    } catch (error) {
        next(error);
    }
};

// Helper function to validate UUID
function isValidUUID(uuid) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
}

// Get farmer coins by farmer
const getFarmerCoinsByFarmer = async (req, res, next) => {
    try {
        const { farmer_id } = req.params;

        if (!isValidUUID(farmer_id)) {
            throw new AppError('Invalid UUID format', 400);
        }

        const { data: farmerCoins, error } = await supabase
            .from('farmer_coins')
            .select('*')
            .eq('farmer_id', farmer_id);

        if (error) {
            throw new AppError('Failed to fetch farmer coins', 500);
        }

        res.json({
            status: 'success',
            data: {
                farmerCoins
            }
        });
    } catch (error) {
        next(error);
    }
};

// Get total investment amount by farmer
const getTotalInvestment = async (req, res, next) => {
    try {
        const { farmer_id } = req.params;

        if (!isValidUUID(farmer_id)) {
            throw new AppError('Invalid UUID format', 400);
        }

        const { data, error } = await supabase
            .from('farmer_coins')
            .select('amount')
            .eq('farmer_id', farmer_id);

        if (error) {
            throw new AppError('Failed to fetch investments', 500);
        }

        const totalAmount = data.reduce((sum, coin) => sum + parseFloat(coin.amount), 0);

        res.json({
            status: 'success',
            data: {
                farmer_id,
                total_investment: totalAmount
            }
        });
    } catch (error) {
        next(error);
    }
};

// Route definitions
router.post('/create', createFarmerCoin);
router.get('/farmer/:farmer_id', getFarmerCoinsByFarmer);
router.get('/total-investment/:farmer_id', getTotalInvestment);

export default router;
