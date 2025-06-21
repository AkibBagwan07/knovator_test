const { createClient } = require("redis");

// Create Redis client using environment variables
const client = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
});

// Log Redis connection errors
client.on("error", (err) => {
  console.error("❌ Redis Client Error:", err.message);
});

// Connect Redis client when imported
const connectRedis = async () => {
  try {
    if (!client.isOpen) {
      await client.connect();
      console.log("✅ Redis connected");
    }
  } catch (err) {
    console.error("❌ Failed to connect to Redis:", err.message);
  }
};

module.exports = { client, connectRedis };
