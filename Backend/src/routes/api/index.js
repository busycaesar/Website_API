const express = require("express");
const router = express.Router();

// Authentication APIs
router.use("/auth", require("./auth"));

// API Keys
router.use("/apikeys", require("./apiKey"));

module.exports = router;
