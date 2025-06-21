// server/routes/importLogs.js
const express = require("express");
const router = express.Router();
const ImportLog = require("../models/ImportLog");

router.get("/", async (req, res) => {
  try {
    const logs = await ImportLog.find().sort({ timestamp: -1 }).limit(50);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
