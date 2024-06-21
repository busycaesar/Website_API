const express = require("express");
const router = express.Router();
const { passport } = require("../../jwt");

// Authentication APIs
router.use("/auth", require("./auth"));

// API Keys
router.use(
  "/apikeys",
  passport.authenticate("jwt", { session: false }),
  require("./apiKey")
);

module.exports = router;
