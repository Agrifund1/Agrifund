import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

async function main() {
    try {
        // Initialize Sui client
        const client = new SuiClient({ url: getFullnodeUrl('testnet') });

        // Create keypair from admin secret key
        const keypair = Ed25519Keypair.fromSecretKey(
            Buffer.from(process.env.SUI_ADMIN_SECRET_KEY!, 'base64')
        );

        // Read all compiled modules
        const moduleFiles = [
            'loan_pool.mv',
            'invest.mv',
            'farmer_coin.mv',
            'wallet_manager.mv'
        ];

        const modules = moduleFiles.map(file => 
            Array.from(fs.readFileSync(
                path.join(__dirname, `../move/build/agrifund/bytecode_modules/${file}`)
            ))
        );

        // Create transaction block
        const tx = new TransactionBlock();
        
        // Publish modules
        const [upgradeCap] = tx.publish({
            modules,
            dependencies: [], // Add dependencies if needed
        });

        // Sign and execute transaction
        const result = await client.signAndExecuteTransactionBlock({
            signer: keypair,
            transactionBlock: tx,
            options: {
                showEffects: true,
                showObjectChanges: true,
            },
        });

        if (!result.effects?.created?.[0]?.reference?.objectId) {
            throw new Error('Failed to get package ID from deployment');
        }

        const packageId = result.effects.created[0].reference.objectId;
        console.log('Deployment successful!');
        console.log('Package ID:', packageId);
        
        // Update config file with new package ID
        updateConfig(packageId);

    } catch (error) {
        console.error('Deployment failed:', error);
        process.exit(1);
    }
}

function updateConfig(packageId: string) {
    const configPath = path.join(__dirname, '../src/config/sui.config.ts');
    const config = `
import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';

const NETWORK = 'testnet';
const suiClient = new SuiClient({ url: getFullnodeUrl(NETWORK) });

const PACKAGE_ID = {
    LOAN_POOL: '${packageId}',
    INVESTMENT: '${packageId}',
    WALLET_MANAGER: '${packageId}'
};

export { suiClient, PACKAGE_ID };
`;

    fs.writeFileSync(configPath, config);
    console.log('Config updated with new package ID');
}

main(); 