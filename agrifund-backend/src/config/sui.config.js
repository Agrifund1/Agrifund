import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client';
import { AppError } from '../middleware/errorHandler.js';

// Validate network configuration
const VALID_NETWORKS = ['testnet', 'mainnet', 'devnet'];
const NETWORK = process.env.SUI_NETWORK || 'testnet';

if (!VALID_NETWORKS.includes(NETWORK)) {
    throw new AppError(`Invalid network: ${NETWORK}. Must be one of: ${VALID_NETWORKS.join(', ')}`, 500);
}

// Create a new Sui Client instance with validation
const createSuiClient = () => {
    try {
        return new SuiClient({ url: getFullnodeUrl(NETWORK) });
    } catch (error) {
        throw new AppError(`Failed to create Sui client: ${error.message}`, 500);
    }
};

export const suiClient = createSuiClient();

// Package IDs with validation
const validatePackageId = (id) => {
    if (!/^0x[a-fA-F0-9]{64}$/.test(id)) {
        throw new AppError(`Invalid package ID format: ${id}`, 500);
    }
    return id;
};

export const PACKAGE_ID = {
    LOAN_POOL: validatePackageId(process.env.SUI_LOAN_POOL_PACKAGE_ID || '0xdbcdfec11e6ddd5dcecc8d92d35c347d3f2269e64db5cfdb57bec45d113d1e87'),
    INVESTMENT: validatePackageId(process.env.SUI_INVESTMENT_PACKAGE_ID || '0x7d3c3a459be8103f8a6a9f0c3c4f916f7f5574d0e02fb3c0ad8bf255f66c8a82'),
    WALLET_MANAGER: validatePackageId(process.env.SUI_WALLET_MANAGER_PACKAGE_ID || '0x8103f8a6a9f0c3c4f916f7f5574d0e02fb3c0ad8bf255f66c8a822d3c3a459be'),
    FARMER_COIN: validatePackageId(process.env.SUI_FARMER_COIN_PACKAGE_ID || '0x916f7f5574d0e02fb3c0ad8bf255f66c8a822d3c3a459be8103f8a6a9f0c3c4f')
};

// Export network information
export const NETWORK_CONFIG = {
    name: NETWORK,
    isTestnet: NETWORK === 'testnet',
    isMainnet: NETWORK === 'mainnet',
    isDevnet: NETWORK === 'devnet'
};
