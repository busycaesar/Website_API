const express = require("express");
const router = express.Router();
const response = require("../response");
require("dotenv").config();

router.post("/register-user", async (req, res) => {
  // Get data from request header.
  const { firstName, lastName, username, email, password } = req.body;

  // Make sure all the required data is available.
  if (!firstName || !username || !email || !password)
    res.status(400).json(response(false, "Insufficient data received."));

  const result = await fetch(`${process.env.AUTH_API}/api/auth/register-user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username, password: password }),
  });

  //   // Register the user using auth-api
  //   const result = await axios.post(
  //     `${process.env.AUTH_API}/api/auth/register-user`,
  //     { username: username, password: password }
  //   );
  //   const { ok, message, body } = result.data;

  //   if (!ok) res.status(409).json(response(false, message));

  //   res
  //     .status(200)
  //     .json(response(true, `${username} is registered successfully`));
});

module.exports = router;
