import { TransactionBlock } from '@mysten/sui.js/transactions';
import { suiClient, PACKAGE_ID } from '../config/sui.config';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';

export class SuiService {
    private keypair: Ed25519Keypair;

    constructor(secretKey: string) {
        this.keypair = Ed25519Keypair.fromSecretKey(Buffer.from(secretKey, 'base64'));
    }

    async createLoanPool(farmerAddress: string, goalAmount: number) {
        const tx = new TransactionBlock();
        
        tx.moveCall({
            target: `${PACKAGE_ID.LOAN_POOL}::loan_pool::create_loan_pool`,
            arguments: [
                tx.pure(farmerAddress),
                tx.pure(goalAmount)
            ]
        });

        return await suiClient.signAndExecuteTransactionBlock({
            signer: this.keypair,
            transactionBlock: tx,
            options: {
                showEffects: true,
                showObjectChanges: true
            }
        });
    }

    async invest(poolId: string, amount: number) {
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

        return await suiClient.signAndExecuteTransactionBlock({
            signer: this.keypair,
            transactionBlock: tx,
            options: {
                showEffects: true,
                showObjectChanges: true
            }
        });
    }

    async mintFarmerCoin(poolId: string, amount: number) {
        const tx = new TransactionBlock();
        
        tx.moveCall({
            target: `${PACKAGE_ID.FARMER_COIN}::farmer_coin::mint_farmer_coin`,
            arguments: [
                tx.object(poolId), // loan pool object
                tx.pure(amount)    // investment amount
            ]
        });

        return await suiClient.signAndExecuteTransactionBlock({
            signer: this.keypair,
            transactionBlock: tx,
            options: {
                showEffects: true,
                showObjectChanges: true
            }
        });
    }

    async getFarmerCoins(address: string) {
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
    }
} 