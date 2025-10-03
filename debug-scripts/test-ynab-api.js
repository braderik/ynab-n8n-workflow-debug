const https = require('https');

const YNAB_API_TOKEN = process.env.YNAB_API_TOKEN;
const BASE_URL = 'https://api.youneedabudget.com/v1';

if (!YNAB_API_TOKEN) {
    console.error('🚨 YNAB API Token is missing! Make sure to set the YNAB_API_TOKEN environment variable.');
    process.exit(1);
}

// Function to make an HTTPS GET request
function httpsGet(url) {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'Authorization': `Bearer ${YNAB_API_TOKEN}` } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
            res.on('error', err => reject(err));
        }).on('error', err => reject(err));
    });
}

// 1. Test API connection and authentication
async function testApiConnection() {
    const url = `${BASE_URL}/budgets`;
    try {
        const response = await httpsGet(url);
        console.log('✅ API connection successful!');
        return response;
    } catch (error) {
        console.error('🚨 API connection failed:', error.message);
        process.exit(1);
    }
}

// 2. Retrieve all budgets and display their details
async function getBudgets() {
    const url = `${BASE_URL}/budgets`;
    try {
        const response = await httpsGet(url);
        console.log('📊 Budgets retrieved successfully!');
        response.data.budgets.forEach(budget => {
            console.log(`Budget ID: ${budget.id}, Name: ${budget.name}`);
        });
    } catch (error) {
        console.error('🚨 Failed to retrieve budgets:', error.message);
    }
}

// 3. Fetch transactions from the past 7 days
async function getRecentTransactions(budgetId) {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    const url = `${BASE_URL}/budgets/${budgetId}/transactions?since_date=${date.toISOString().split('T')[0]}`;
    try {
        const response = await httpsGet(url);
        console.log('📅 Recent transactions retrieved successfully!');
        return response.data.transactions;
    } catch (error) {
        console.error('🚨 Failed to retrieve transactions:', error.message);
    }
}

// 4. Show detailed transaction information
async function showTransactionDetails(transactions) {
    transactions.forEach(transaction => {
        console.log(`Transaction ID: ${transaction.id}, Amount: ${(transaction.amount / 1000).toFixed(2)}, Date: ${transaction.date}`);
    });
}

(async () => {
    await testApiConnection();
    const budgets = await getBudgets();
    if (budgets && budgets.data && budgets.data.budgets.length > 0) {
        const budgetId = budgets.data.budgets[0].id;
        const transactions = await getRecentTransactions(budgetId);
        if (transactions) {
            await showTransactionDetails(transactions);
        }
    } else {
        console.log('🚨 No budgets available.');
    }
})();
