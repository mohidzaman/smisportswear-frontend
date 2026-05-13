const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

async function testFileSubmission() {
    try {
        const formData = new FormData();
        formData.append('name', 'Test File Lead');
        formData.append('email', 'test-file@smisportswears.com');
        formData.append('whatsapp', '0987654321');
        formData.append('productType', 'Teamwear');
        formData.append('quantity', '50');
        formData.append('message', 'Testing file upload with STRICT_DEBUG');
        
        const filePath = path.join(__dirname, '../test-design.png');
        if (fs.existsSync(filePath)) {
            formData.append('design', fs.createReadStream(filePath));
            console.log('📎 Attaching test-design.png from root to "design" field...');
        } else {
            console.log('Searching in current directory...');
            const localPath = path.join(__dirname, 'test-design.png');
            if (fs.existsSync(localPath)) {
                formData.append('design', fs.createReadStream(localPath));
                console.log('📎 Attaching test-design.png from current dir to "design" field...');
            } else {
                console.error('❌ test-design.png NOT FOUND anywhere!');
                return;
            }
        }

        console.log('📡 Sending multipart/form-data request to http://localhost:5000/api/leads...');
        const response = await axios.post('http://localhost:5000/api/leads', formData, {
            headers: formData.getHeaders()
        });

        console.log('✅ Status:', response.status);
        console.log('📄 Response:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        if (error.response) {
            console.error('❌ Failed:', error.response.status, JSON.stringify(error.response.data, null, 2));
        } else {
            console.error('❌ Error:', error.message);
        }
    }
}

testFileSubmission();
