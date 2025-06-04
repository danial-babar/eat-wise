import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    console.log('MongoDB: Using cached connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      // useNewUrlParser: true, // No longer needed in Mongoose 6+
      // useUnifiedTopology: true, // No longer needed in Mongoose 6+
    };

    console.log('MongoDB: Creating new connection');
    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongooseInstance) => {
      console.log('MongoDB: Connection successful');
      return mongooseInstance;
    }).catch(error => {
      console.error('MongoDB: Connection error:', error);
      cached.promise = null; // Reset promise on error so next attempt can try again
      throw error; // Re-throw error to be caught by caller
    });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  
  return cached.conn;
}

export default dbConnect;
