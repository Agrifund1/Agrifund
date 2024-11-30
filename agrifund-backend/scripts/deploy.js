"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ed25519_1 = require("@mysten/sui.js/keypairs/ed25519");
const transactions_1 = require("@mysten/sui.js/transactions");
const client_1 = require("@mysten/sui.js/client");
const dotenv = __importStar(require("dotenv"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
dotenv.config();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        try {
            // Initialize Sui client
            const client = new client_1.SuiClient({ url: (0, client_1.getFullnodeUrl)('testnet') });
            // Create keypair from admin secret key
            const keypair = ed25519_1.Ed25519Keypair.fromSecretKey(Buffer.from(process.env.SUI_ADMIN_SECRET_KEY, 'base64'));
            // Read all compiled modules
            const moduleFiles = [
                'loan_pool.mv',
                'invest.mv',
                'farmer_coin.mv',
                'wallet_manager.mv'
            ];
            const modules = moduleFiles.map(file => Array.from(fs.readFileSync(path.join(__dirname, `../move/build/agrifund/bytecode_modules/${file}`))));
            // Create transaction block
            const tx = new transactions_1.TransactionBlock();
            // Publish modules
            const [upgradeCap] = tx.publish({
                modules,
                dependencies: [], // Add dependencies if needed
            });
            // Sign and execute transaction
            const result = yield client.signAndExecuteTransactionBlock({
                signer: keypair,
                transactionBlock: tx,
                options: {
                    showEffects: true,
                    showObjectChanges: true,
                },
            });
            if (!((_d = (_c = (_b = (_a = result.effects) === null || _a === void 0 ? void 0 : _a.created) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.reference) === null || _d === void 0 ? void 0 : _d.objectId)) {
                throw new Error('Failed to get package ID from deployment');
            }
            const packageId = result.effects.created[0].reference.objectId;
            console.log('Deployment successful!');
            console.log('Package ID:', packageId);
            // Update config file with new package ID
            updateConfig(packageId);
        }
        catch (error) {
            console.error('Deployment failed:', error);
            process.exit(1);
        }
    });
}
function updateConfig(packageId) {
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
