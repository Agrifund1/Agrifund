import express from 'express';
import { body, validationResult } from 'express-validator';
import { UserService } from '../services/user.service.js';
import { AppError } from '../middleware/errorHandler.js';

const router = express.Router();
const userService = new UserService();

// Validation middleware
const validateUser = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('role').isIn(['student', 'farmer', 'investor', 'business', 'admin']),
  body('name').optional().trim().notEmpty(),
  body('profile_data').optional().isObject()
];

// Create user endpoint
router.post('/register', validateUser, async (req, res) => {
  try {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const result = await userService.createUser(req.body);
    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      data: {
        user: {
          id: result.user.id,
          email: result.user.email,
          name: result.user.name,
          role: result.user.role,
          wallet_address: result.wallet.address
        },
        wallet: {
          address: result.wallet.address,
          encryptedKey: result.wallet.encryptedKey
        }
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to create user',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const result = await userService.loginUser(req.body);
    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: {
        user: {
          id: result.user.id,
          email: result.user.email,
          name: result.user.name,
          role: result.user.role,
          wallet_address: result.user.wallet_address
        },
        token: result.token
      }
    });
  } catch (err) {
    res.status(401).json({
      status: 'error',
      message: 'Login failed',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

export default router;
