import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { suiClient, PACKAGE_ID } from './src/config/sui.config.js';
import rateLimit from 'express-rate-limit';
import { config, supabase } from './src/config/config.js';
import userRoutes from './src/routes/user.routes.js';
import walletRoutes from './src/routes/wallet.routes.js';
import farmerCoinRoutes from './src/routes/farmer-coin.routes.js';
import suiRoutes from './src/routes/sui.routes.js';
import loanPoolRoutes from './src/routes/loan-pool.routes.js';
import { errorHandler } from './src/middleware/errorHandler.js';

// Load and validate environment variables
// dotenv.config();
// validateEnv();

// Create Express app
const app = express();
const port = config.port || 3000;

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to handle Sui and Supabase errors
app.use(async (err, req, res, next) => {
    console.error(err.stack);
    
    // Differentiate between Sui and Supabase errors
    if (err.message.includes('Sui')) {
        return res.status(500).json({
            status: 'error',
            type: 'blockchain_error',
            message: 'Blockchain operation failed',
            error: config.nodeEnv === 'development' ? err.message : undefined
        });
    }
    
    if (err.message.includes('Supabase')) {
        return res.status(500).json({
            status: 'error',
            type: 'database_error',
            message: 'Database operation failed',
            error: config.nodeEnv === 'development' ? err.message : undefined
        });
    }

    res.status(500).json({
        status: 'error',
        message: 'Something went wrong!',
        error: config.nodeEnv === 'development' ? err.message : undefined
    });
});

// Database and blockchain connection test endpoint
app.get('/connection-test', async (req, res) => {
    try {
        // Test Supabase connection
        const { data: dbData, error: dbError } = await supabase
            .from('users')
            .select('count');
            
        if (dbError) throw new Error(`Supabase: ${dbError.message}`);

        // Test Sui connection
        const { data: blockchainData, error: blockchainError } = await suiClient
            .getObject({
                id: PACKAGE_ID.LOAN_POOL,
                options: { showContent: true }
            });

        if (blockchainError) throw new Error(`Sui: ${blockchainError.message}`);

        res.status(200).json({ 
            status: 'ok', 
            message: 'All services connected successfully',
            connections: {
                database: 'connected',
                blockchain: 'connected'
            }
        });
    } catch (err) {
        res.status(500).json({ 
            status: 'error', 
            message: err.message,
            connections: {
                database: err.message.includes('Supabase') ? 'error' : 'connected',
                blockchain: err.message.includes('Sui') ? 'error' : 'connected'
            }
        });
    }
});

// Create loan pool both on-chain and in database
app.post('/loan-pools', async (req, res) => {
    try {
        const { farmer_id, title, description, goal_amount } = req.body;

        // 1. Create loan pool on Sui blockchain
        const tx = new TransactionBlock();
        const [loanPool] = tx.moveCall({
            target: `${PACKAGE_ID.LOAN_POOL}::loan_pool::create_loan_pool`,
            arguments: [
                tx.pure(farmer_id),
                tx.pure(BigInt(goal_amount))
            ]
        });

        const result = await suiClient.signAndExecuteTransactionBlock({
            transactionBlock: tx,
            options: {
                showEffects: true,
                showObjectChanges: true
            }
        });

        // 2. Store loan pool data in Supabase
        const { data: dbData, error: dbError } = await supabase
            .from('loan_pools')
            .insert([{
                farmer_id,
                title,
                description,
                goal_amount,
                current_amount: 0,
                status: 'active',
                blockchain_id: result.objectChanges[0].objectId, // Store blockchain object ID
                created_at: new Date().toISOString()
            }])
            .select()
            .single();

        if (dbError) throw new Error(`Supabase: ${dbError.message}`);

        res.status(201).json({
            status: 'success',
            message: 'Loan pool created successfully',
            data: {
                database: dbData,
                blockchain: {
                    transactionDigest: result.digest,
                    objectId: result.objectChanges[0].objectId
                }
            }
        });

    } catch (err) {
        console.error('Error creating loan pool:', err);
        res.status(500).json({
            status: 'error',
            message: 'Failed to create loan pool',
            error: config.nodeEnv === 'development' ? err.message : undefined
        });
    }
});

// Create loan pool both on-chain and in database
app.post('/api/loan-pools', async (req, res, next) => {
    try {
        const { farmer_id, title, description, goal_amount } = req.body;

        // Validate input
        if (!farmer_id || !title || !description || !goal_amount) {
            throw new Error('Missing required fields');
        }

        // Create loan pool on Sui blockchain
        const tx = new TransactionBlock();
        const [coin] = tx.splitCoins(tx.gas, [tx.pure(goal_amount)]);
        
        tx.moveCall({
            target: `${PACKAGE_ID.LOAN_POOL}::loan_pool::create_pool`,
            arguments: [
                coin,
                tx.pure(title),
                tx.pure(description),
                tx.pure(farmer_id)
            ],
        });

        const result = await suiClient.signAndExecuteTransactionBlock({
            transactionBlock: tx,
            options: {
                showEffects: true,
                showEvents: true,
            },
        });

        // Store loan pool in database
        const { data: loanPool, error } = await supabase
            .from('loan_pools')
            .insert({
                farmer_id,
                title,
                description,
                goal_amount,
                current_amount: 0,
                status: 'active',
                blockchain_id: result.effects.created[0].reference.objectId
            })
            .select()
            .single();

        if (error) {
            throw new Error('Failed to create loan pool');
        }

        res.status(201).json(loanPool);
    } catch (error) {
        next(error);
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/farmer-coin', farmerCoinRoutes);
app.use('/api/sui', suiRoutes);
app.use('/api/loan-pools', loanPoolRoutes);

// Error handling middleware
app.use(errorHandler);

// Handle 404
app.use((req, res) => {
    res.status(404).json({ 
        status: 'error',
        message: 'Route not found'
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port} in ${config.nodeEnv} mode`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err);
    // Don't exit the process in production, just log the error
    if (config.nodeEnv === 'development') {
        process.exit(1);
    }
});

export default app;
