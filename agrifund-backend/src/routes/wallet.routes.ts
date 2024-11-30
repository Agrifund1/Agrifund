import { Router, Request, Response } from 'express';
import { WalletService } from '../services/wallet.service';
import { authenticateUser } from '../middleware/auth';

// Extend Request type to include authenticated user
interface AuthenticatedRequest extends Request {
    user: {
        id: string;
        role: string;
    };
}

const router = Router();
const walletService = new WalletService();

/**
 * Connect a new wallet
 */
router.post('/connect', authenticateUser, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const { walletAddress, walletType } = req.body;

        if (!walletAddress || !walletType) {
            res.status(400).json({ error: 'Wallet address and type are required.' });
            return;
        }

        const result = await walletService.connectWallet(req.user.id, walletAddress, walletType);
        res.status(201).json(result);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * Verify wallet ownership
 */
router.post('/verify', authenticateUser, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const { walletAddress, signedMessage } = req.body;

        if (!walletAddress || !signedMessage) {
            res.status(400).json({ error: 'Wallet address and signed message are required.' });
            return;
        }

        const result = await walletService.verifyWallet(req.user.id, walletAddress, signedMessage);
        res.status(200).json(result);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * Set a primary wallet
 */
router.put('/primary', authenticateUser, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const { walletAddress } = req.body;

        if (!walletAddress) {
            res.status(400).json({ error: 'Wallet address is required.' });
            return;
        }

        const result = await walletService.setPrimaryWallet(req.user.id, walletAddress);
        res.status(200).json(result);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * Get all wallets for the authenticated user
 */
router.get('/', authenticateUser, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const wallets = await walletService.getUserWallets(req.user.id);
        res.status(200).json(wallets);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
