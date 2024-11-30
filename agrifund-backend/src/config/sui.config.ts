import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';

// Configure network (testnet for development)
// We use testnet for development and testing before moving to mainnet
const NETWORK = 'testnet';

// Create a new Sui Client instance
// This client will be used to interact with the Sui blockchain
const suiClient = new SuiClient({ url: getFullnodeUrl(NETWORK) });

// Package IDs are unique identifiers for your deployed Move contracts
// You'll get these after deploying your Move contracts to the network
const PACKAGE_ID = {
    LOAN_POOL: '0xdbcdfec11e6ddd5dcecc8d92d35c347d3f2269e64db5cfdb57bec45d113d1e87',      // Same package ID
    INVESTMENT: '0xdbcdfec11e6ddd5dcecc8d92d35c347d3f2269e64db5cfdb57bec45d113d1e87',      // Same package ID
    WALLET_MANAGER: '0xdbcdfec11e6ddd5dcecc8d92d35c347d3f2269e64db5cfdb57bec45d113d1e87',
    FARMER_COIN: '0xdbcdfec11e6ddd5dcecc8d92d35c347d3f2269e64db5cfdb57bec45d113d1e87' // Same package ID
};

export { suiClient, PACKAGE_ID }; 