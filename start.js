const { connectToMongoDB } = require("./db");
const createServer = require("./server");
const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Connect to MongoDB first
    // await connectToMongoDB();
    console.log("MongoDB connection established.");

    // Create and start the HTTP server
    const httpServer = await createServer();

    // Start the server after MongoDB is connected
    httpServer.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Failed to start the server:", err);
    process.exit(1); // Exit if the server cannot start
  }
};

startServer();
