const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const importLogRoutes = require("./routes/importRoutes");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/import-logs", importLogRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err.message));

module.exports = app;
