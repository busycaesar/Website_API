const express = require("express");
const router = express.Router();
const response = require("../response");
require("dotenv").config();
const { addNewUser, addUserAPIKeys, addUniqueUserAPIKey } = require("../../db");
const { generateApiKey } = require("../../apiKeyGenerator");

router.post("/register-user", async (req, res) => {
  // Get all the data from the request header.
  const { firstName, lastName, username, email, password } = req.body;

  // Make sure all the required data is available.
  if (!firstName || !username || !email || !password)
    res.status(400).json(response(false, "Insufficient data received."));

  // Try to register the user using authentication api.
  const result = await fetch(`${process.env.AUTH_API}/api/auth/register-user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username, password: password }),
  });

  const { ok, message, body } = await result.json();

  if (!ok) return res.status(400).json(response(false, message));

  console.log(`Register the new user, ${username}.`);

  try {
    // Try to store the user's information along with the user's unique id.
    const userId = await addNewUser(firstName, lastName, username, email, body);

    // Generate unique API Key for the new user.
    const uniqueAPIKey = generateApiKey();

    // Store the generated unique API Key of the user.
    await addUniqueUserAPIKey(userId, uniqueAPIKey);

    // Create the API Keys row for the new user.
    await addUserAPIKeys(userId);

    res
      .status(201)
      .json(
        response(true, `${username} is registered successfully.`, { userId })
      );
  } catch (error) {
    res
      .status(500)
      .json(response(false, `Error while registering the new user. ${error}`));
  }
});

router.post("/validate-user", async (req, res) => {
  // Get all the data from the request header.
  const { username, password } = req.body;

  // Make sure all the required data is available.
  if (!username || !password)
    res.status(400).json(response(false, "Insufficient data received."));

  // Try to validate the user using authentication api.
  let result = await fetch(`${process.env.AUTH_API}/api/auth/validate-user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username, password: password }),
  });

  result = await result.json();

  if (!result.ok) return res.status(400).json(response(false, result.message));

  console.log(`Validate the registered user, ${username}.`);

  res
    .status(200)
    .json(response(true, `${username} is validated successfully.`));
});

module.exports = router;
