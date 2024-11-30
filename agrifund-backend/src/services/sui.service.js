import { TransactionBlock } from '@mysten/sui.js/transactions';
import { suiClient, PACKAGE_ID } from '../config/sui.config.js';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { AppError } from '../middleware/errorHandler.js';
import { config } from '../config/config.js';

export class SuiService {
    constructor(secretKey = process.env.SUI_ADMIN_SECRET_KEY) {
        if (!secretKey) {
            throw new AppError('SUI_ADMIN_SECRET_KEY is required', 500);
        }
        try {
            // Extract the private key from suiprivkey format
            if (secretKey.startsWith('suiprivkey')) {
                // Remove the 'suiprivkey' prefix and decode base64
                const base64Key = secretKey.substring('suiprivkey'.length);
                // Convert to Uint8Array and take first 32 bytes
                const decoded = Buffer.from(base64Key, 'base64');
                const privateKeyBytes = decoded.slice(0, 32);
                this.keypair = Ed25519Keypair.fromSecretKey(privateKeyBytes);
            } else {
                throw new AppError('Invalid key format. Must start with suiprivkey', 500);
            }
        } catch (error) {
            console.error('Key initialization error:', error);
            throw new AppError('Invalid SUI_ADMIN_SECRET_KEY format', 500);
        }
    }

    // Get admin address for debugging
    getAdminAddress() {
        return this.keypair.toSuiAddress();
    }

    // Get admin balance for debugging
    async getAdminBalance() {
        try {
            const address = this.getAdminAddress();
            console.log('Admin address:', address);
            
            const balance = await suiClient.getBalance({
                owner: address,
                coinType: '0x2::sui::SUI'
            });
            
            console.log('Admin balance:', balance);
            return balance;
        } catch (error) {
            console.error('Error getting admin balance:', error);
            throw new AppError(`Failed to get admin balance: ${error.message}`, 500);
        }
    }

    async createLoanPool(farmerAddress, title, description, goalAmount) {
        try {
            // First check admin balance
            const balance = await this.getAdminBalance();
            console.log('Creating loan pool with:', { farmerAddress, title, description, goalAmount, adminBalance: balance });
            
            const tx = new TransactionBlock();
            
            // Convert strings to UTF-8 byte arrays for Move's vector<u8>
            const titleBytes = Array.from(new TextEncoder().encode(title));
            const descriptionBytes = Array.from(new TextEncoder().encode(description));
            
            // Create loan pool with exact parameters matching Move contract
            tx.moveCall({
                target: `${PACKAGE_ID.LOAN_POOL}::loan_pool::create_loan_pool`,
                arguments: [
                    tx.pure(farmerAddress), // farmer: address
                    tx.pure(titleBytes), // title: vector<u8>
                    tx.pure(descriptionBytes), // description: vector<u8>
                    tx.pure(goalAmount) // goal_amount: u64
                ]
            });

            console.log('Executing transaction...');
            const result = await suiClient.signAndExecuteTransactionBlock({
                signer: this.keypair,
                transactionBlock: tx,
                options: {
                    showEffects: true,
                    showEvents: true,
                }
            });
            console.log('Transaction result:', result);

            return result;
        } catch (error) {
            console.error('Create loan pool error:', error);
            throw new AppError(`Failed to create loan pool: ${error.message}`, 500);
        }
    }

    async invest(poolId, amount) {
        try {
            const tx = new TransactionBlock();
            // Split coin for payment
            const [paymentCoin] = tx.splitCoins(tx.gas, [tx.pure(amount)]);
            tx.moveCall({
                target: `${PACKAGE_ID.LOAN_POOL}::loan_pool::invest`,
                arguments: [
                    tx.object(poolId),
                    paymentCoin,
                    tx.pure(amount)
                ]
            });
            const result = await suiClient.signAndExecuteTransactionBlock({
                signer: this.keypair,
                transactionBlock: tx,
                options: {
                    showEffects: true,
                    showObjectChanges: true
                }
            });
            return result;
        } catch (error) {
            throw new AppError(`Failed to invest: ${error.message}`, 500);
        }
    }

    async mintFarmerCoin(poolId, amount) {
        try {
            const tx = new TransactionBlock();
            tx.moveCall({
                target: `${PACKAGE_ID.FARMER_COIN}::farmer_coin::mint_farmer_coin`,
                arguments: [
                    tx.object(poolId), // loan pool object
                    tx.pure(amount) // investment amount
                ]
            });
            const result = await suiClient.signAndExecuteTransactionBlock({
                signer: this.keypair,
                transactionBlock: tx,
                options: {
                    showEffects: true,
                    showObjectChanges: true
                }
            });
            return result;
        } catch (error) {
            throw new AppError(`Failed to mint farmer coin: ${error.message}`, 500);
        }
    }

    async getFarmerCoins(address) {
        try {
            return await suiClient.getOwnedObjects({
                owner: address,
                filter: {
                    Package: PACKAGE_ID.FARMER_COIN
                },
                options: {
                    showContent: true,
                    showType: true
                }
            });
        } catch (error) {
            throw new AppError(`Failed to get farmer coins: ${error.message}`, 500);
        }
    }

    async mintFarmerCoin(farmerId, amount) {
        try {
            const tx = new TransactionBlock();
            tx.moveCall({
                target: `${PACKAGE_ID.FARMER_COIN}::farmer_coin::mint`,
                arguments: [
                    tx.pure(farmerId),
                    tx.pure(amount)
                ]
            });

            const result = await suiClient.signAndExecuteTransactionBlock({
                signer: this.keypair,
                transactionBlock: tx,
                options: {
                    showEffects: true,
                    showEvents: true,
                }
            });

            return result;
        } catch (error) {
            throw new AppError(`Failed to mint farmer coin: ${error.message}`, 500);
        }
    }

    async transferCoin(recipientAddress, amount) {
        try {
            const tx = new TransactionBlock();
            const [coin] = tx.splitCoins(tx.gas, [tx.pure(amount)]);
            tx.transferObjects([coin], tx.pure(recipientAddress));

            const result = await suiClient.signAndExecuteTransactionBlock({
                signer: this.keypair,
                transactionBlock: tx,
                options: {
                    showEffects: true,
                    showEvents: true,
                }
            });

            return result;
        } catch (error) {
            throw new AppError(`Failed to transfer coin: ${error.message}`, 500);
        }
    }
}
