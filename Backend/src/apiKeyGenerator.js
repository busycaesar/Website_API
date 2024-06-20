const crypto = require("crypto");

// Generate a unique API key
const generateApiKey = () => {
  return crypto.randomBytes(32).toString("hex");
};

module.exports = { generateApiKey };
