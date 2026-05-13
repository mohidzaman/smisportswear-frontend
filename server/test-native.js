const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.MONGO_URI;

async function run() {
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 10000 });
    try {
        console.log("Connecting using native driver...");
        await client.connect();
        console.log("Connected successfully to Atlas!");
        await client.db("admin").command({ ping: 1 });
        console.log("Ping successful.");
    } catch (err) {
        console.error("Native connection failed:", err.message);
    } finally {
        await client.close();
    }
}

run();
