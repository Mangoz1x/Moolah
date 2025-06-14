import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error('⛔  Missing MONGODB_URI in .env.local');

const options = {};
let clientPromise;

if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        global._mongoClientPromise = new MongoClient(uri, options).connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    clientPromise = new MongoClient(uri, options).connect();
}

export default clientPromise;   // feed this to MongoDBAdapter
