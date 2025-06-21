const mongoose = require("mongoose");

const importLogSchema = new mongoose.Schema({
  url: String,
  timestamp: { type: Date, default: Date.now },
  totalFetched: Number,
  totalImported: Number,
  newJobs: Number,
  updatedJobs: Number,
  failedJobs: [
    {
      reason: String,
      data: Object,
    },
  ],
});

module.exports = mongoose.model("ImportLog", importLogSchema);
