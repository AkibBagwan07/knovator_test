const app = require("./app");
const startCron = require("./cron");
require("./jobs/worker"); // Starts Bull queue worker

const PORT = process.env.PORT || 5000;

// Start cron job to fetch feeds periodically
startCron();

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
