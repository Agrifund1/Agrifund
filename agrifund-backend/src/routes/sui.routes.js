import { Router } from 'express';
import { SuiService } from '../services/sui.service.js';
import { AppError } from '../middleware/errorHandler.js';

const router = Router();
let suiService;

try {
    suiService = new SuiService();
} catch (error) {
    console.error('Failed to initialize SuiService:', error);
    throw error;
}

// Get admin balance
router.get('/admin-balance', async (req, res, next) => {
    try {
        const address = suiService.getAdminAddress();
        const balance = await suiService.getAdminBalance();
        
        res.json({
            status: 'success',
            data: {
                address,
                balance
            }
        });
    } catch (error) {
        next(error instanceof AppError ? error : new AppError(error.message, 500));
    }
});

export default router;
