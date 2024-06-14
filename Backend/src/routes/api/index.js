const express = require("express");
const router = express.Router();

// Authentication APIs
router.use("/auth", require("./auth"));

module.exports = router;
