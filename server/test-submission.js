const axios = require('axios');

async function testLead() {
    try {
        console.log('Attempting to submit a test lead...');
        const response = await axios.post('http://localhost:5000/api/leads', {
            name: 'Test Model',
            email: 'test@example.com',
            whatsapp: '1234567890',
            productType: 'test',
            quantity: 10
        });
        console.log('Response Status:', response.status);
        console.log('Response Data:', response.data);
    } catch (error) {
        if (error.response) {
            console.error('Submission Failed:', error.response.status, error.response.data);
        } else {
            console.error('Error:', error.message);
        }
    }
}

testLead();
