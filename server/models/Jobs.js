const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  url: { type: String, unique: true },
  description: String,
  datePosted: Date,
});

module.exports = mongoose.model("Job", jobSchema);
