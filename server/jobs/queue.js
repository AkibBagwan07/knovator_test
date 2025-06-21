const Queue = require("bull");

const jobQueue = new Queue("job-importer-queue", {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
  },
});

jobQueue.on("error", (err) => {
  console.error("❌ Redis Queue Error:", err.message);
});

module.exports = jobQueue;
