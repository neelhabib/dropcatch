const { MongoClient } = require("mongodb");

const localConnectionString =
  process.env.MONGODB_URI || "mongodb://localhost:27017";
const client = new MongoClient(localConnectionString);

let isClientConnected = false;

const connectToMongoDB = async () => {
  if (!isClientConnected) {
    try {
      await client.connect();
      console.log("Successfully connected to MongoDB");
      isClientConnected = true;
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  }
  return client; // Return the client object after connecting
};

// Export both the connection function and the MongoDB client
module.exports = { connectToMongoDB, client };
