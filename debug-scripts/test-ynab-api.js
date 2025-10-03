const axios = require('axios');

const YNAB_API_TOKEN = 'your_api_token';
const YNAB_API_URL = 'https://api.ynab.com/v1';

async function testYNABConnection() {
    try {
        const response = await axios.get(`${YNAB_API_URL}/budgets`, {
            headers: {
                Authorization: `Bearer ${YNAB_API_TOKEN}`
            }
        });
        console.log('Budgets:', response.data);
    } catch (error) {
        console.error('Error connecting to YNAB API:', error);
    }
}

testYNABConnection();