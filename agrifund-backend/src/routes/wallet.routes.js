import express from 'express';
import { WalletService } from '../services/wallet.service.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();
const walletService = new WalletService();

// Connect new wallet
router.post('/connect', authenticateUser, async (req, res) => {
    try {
        const { walletAddress, walletType } = req.body;
        const result = await walletService.connectWallet(req.user.id, walletAddress, walletType);
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Verify wallet ownership
router.post('/verify', authenticateUser, async (req, res) => {
    try {
        const { walletAddress, signedMessage } = req.body;
        const result = await walletService.verifyWallet(req.user.id, walletAddress, signedMessage);
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Set primary wallet
router.put('/primary', authenticateUser, async (req, res) => {
    try {
        const { walletAddress } = req.body;
        const result = await walletService.setPrimaryWallet(req.user.id, walletAddress);
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get user wallets
router.get('/', authenticateUser, async (req, res) => {
    try {
        const wallets = await walletService.getUserWallets(req.user.id);
        res.json(wallets);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
