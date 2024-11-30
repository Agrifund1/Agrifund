import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = 'http://localhost:5000/api';

// Test health endpoint
async function testHealth() {
    try {
        const response = await fetch(`${BASE_URL}/health`);
        const data = await response.json();
        console.log('Health Check:', JSON.stringify(data, null, 2));
        return response.ok;
    } catch (error) {
        console.error('Health check error:', error.message);
        return false;
    }
}

// Test admin balance
async function testAdminBalance() {
    try {
        const response = await fetch(`${BASE_URL}/sui/admin-balance`);
        const data = await response.json();
        console.log('Admin Balance:', JSON.stringify(data, null, 2));
        return response.ok;
    } catch (error) {
        console.error('Admin balance error:', error.message);
        return false;
    }
}

// Test create farmer coin
async function testCreateFarmerCoin() {
    try {
        // Using existing UUIDs for testing
        const testData = {
            farmer_id: "5edb382c-2986-47d3-8560-7bc2eef6b4db", // Replace with an existing farmer UUID
            loan_pool_id: "c2f3b08c-59d8-4e2d-a1d2-35dcf6cce2ac", // Replace with an existing loan pool UUID
            amount: 1000.00
        };
        
        console.log('Creating farmer coin with data:');
        console.log(JSON.stringify(testData, null, 2));

        const response = await fetch(`${BASE_URL}/farmer-coin/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(testData)
        });

        const responseText = await response.text();
        let data;
        try {
            data = JSON.parse(responseText);
        } catch (e) {
            console.log('Raw response:', responseText);
            throw new Error('Invalid JSON response');
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}, body: ${JSON.stringify(data, null, 2)}`);
        }

        console.log('Create Farmer Coin Response:', JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error('Error creating farmer coin:', error.message);
        return false;
    }
}

// Run tests
async function runTests() {
    console.log('Starting tests...\n');
    
    console.log('0. Testing Health Endpoint');
    const healthOk = await testHealth();
    console.log('Health check ' + (healthOk ? 'passed ' : 'failed ') + '\n');
    
    if (healthOk) {
        console.log('1. Testing Admin Balance');
        const balanceOk = await testAdminBalance();
        console.log('Admin balance check ' + (balanceOk ? 'passed ' : 'failed ') + '\n');

        console.log('2. Testing Create Farmer Coin');
        const createCoinOk = await testCreateFarmerCoin();
        console.log('Create farmer coin ' + (createCoinOk ? 'passed ' : 'failed ') + '\n');
    }
}

runTests().catch(console.error);
