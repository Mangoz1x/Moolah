// Don’t rename – every server action / route that touches Mongo should import this.
import mongoose from 'mongoose';

const { MONGODB_URI, MONGODB_DB } = process.env;
if (!MONGODB_URI) throw new Error('⛔  Missing MONGODB_URI in .env.local');

let cached = global.__mongoose;          // global prevents hot-reload spam
if (!cached) cached = global.__mongoose = { conn: null, promise: null };

export default async function dbConnect() {
    if (cached.conn) return cached.conn;   // already connected

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            dbName: MONGODB_DB,
            bufferCommands: false,
        }).then(m => m);
    }
    cached.conn = await cached.promise;
    return cached.conn;
}
