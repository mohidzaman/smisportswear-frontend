const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const checkLeads = async () => {
    try {
        console.log('Connecting to:', process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        const Lead = mongoose.model('Lead', new mongoose.Schema({}, { strict: false, collection: 'leads' }));
        const count = await Lead.countDocuments();
        const latest = await Lead.find().sort({ createdAt: -1 }).limit(1);
        console.log(`Total Leads: ${count}`);
        console.log('Latest Lead:', JSON.stringify(latest, null, 2));
        process.exit(0);
    } catch (error) {
        console.error('Check failed:', error.message);
        process.exit(1);
    }
};

checkLeads();
