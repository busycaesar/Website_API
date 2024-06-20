const express = require("express");
const router = express.Router();
const response = require("./response");
const info = require("../../package.json");
const { dbHealthCheck } = require("../db");

router.use("/api", require("./api"));

// GET Routes.
router.get("/", async (req, res) => {
  try {
    console.log("Backend Health Check");
    const dbHealth = await dbHealthCheck();
    res.setHeader("Cache-Control", "no-cache");
    res.status(200).json(
      response(true, "Healthy", {
        Version: info.version,
        DB: dbHealth,
      })
    );
  } catch (error) {
    console.error("Error while health check.", error);
    res.status(500).json(response(false, "Error while health check."));
  }
});

// POST Routes.
router.use((req, res) =>
  res.status(404).json(response(false, "Route does not exist.", null))
);

module.exports = router;
