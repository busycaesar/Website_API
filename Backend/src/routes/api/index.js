const express = require("express");
const router = express.Router();
const { middleware } = require("../../jwt");

// Authentication APIs
router.use("/auth", require("./auth"));

// API Keys
router.use("/apikeys", middleware, require("./apiKey"));

module.exports = router;
