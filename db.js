const { MongoClient } = require("mongodb");
const localConnectionString =
  process.env.MONGODB_URI || "mongodb://localhost:27017";

// Create a cached connection variable
let cachedClient = null;
let cachedDb = null;

async function connectToMongoDB() {
  // If the connection already exists, reuse it
  if (cachedClient && cachedDb) {
    return {
      client: cachedClient,
      db: cachedDb,
    };
  }

  // If no connection exists, create a new one
  const client = new MongoClient(localConnectionString, {
    // Recommended options for serverless environments
    maxPoolSize: 10,
    minPoolSize: 0,
    maxIdleTimeMS: 15000,
  });

  await client.connect();
  const db = client.db("drop-catch");

  // Cache the client and db instances
  cachedClient = client;
  cachedDb = db;

  return {
    client: cachedClient,
    db: cachedDb,
  };
}

module.exports = { connectToMongoDB };
