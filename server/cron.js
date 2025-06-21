const fetchAllFeeds = require("./services/fetchJobs");

function startCron() {
  // Fetch feeds immediately on startup
  fetchAllFeeds();

  // Fetch every hour
  setInterval(fetchAllFeeds, 60 * 60 * 1000);
}

module.exports = startCron;
