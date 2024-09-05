const express = require("express");
const router = express.Router();
const response = require("../response");
const { getUserInfo, getUserAPIKeys, updateUserAPIKeys } = require("../../db");
const { matchUserIdWithToken } = require("../../jwt");

// Get all the API Keys of the user.
router.get("/:userId", async (req, res) => {
  // Get the id of the user.
  const { userId } = req.params;

  // Make sure the id is not null.
  if (!userId)
    res
      .status(400)
      .json(
        response(
          false,
          "Insufficient data received. Please check the requirement for this API."
        )
      );

  // Make sure that the id passed is valid.
  try {
    await getUserInfo(userId);
  } catch (error) {
    return res
      .status(400)
      .json(response(false, `No user found with id ${userId}.`));
  }

  console.log(`Request to get API keys for ${userId}.`);

  try {
    // Try to get all the API Keys of the user.
    const apiKeys = await getUserAPIKeys(userId);

    res.status(200).json(response(true, `All the user keys sent.`, apiKeys));
  } catch (error) {
    res
      .status(500)
      .json(
        response(false, `Error while getting the APIs for the user. ${error}`)
      );
  }
});

// Patch the API Key/s of the user.
router.patch("/:userId", async (req, res) => {
  // Get the id of the user.
  const { userId } = req.params;

  // Get the api keys to update.
  const { github, linkedin, youtube, devto } = req.body;

  // Make sure the id is not null.
  if (!userId)
    res
      .status(400)
      .json(
        response(
          false,
          "Insufficient data received. Please check the requirement for this API."
        )
      );

  // Make sure that the id passed is valid.
  try {
    await getUserInfo(userId);
  } catch (error) {
    res.status(400).json(response(false, `No user found with id ${userId}.`));
  }

  console.log(`Request to patch API key/s for ${userId}.`);

  try {
    // Try to get all the API Keys of the user.
    await updateUserAPIKeys(userId, github, linkedin, youtube, devto);

    // Get the updated API Keys of the user.
    const updateAPIKeys = await getUserAPIKeys(userId);

    res
      .status(201)
      .json(response(true, `The API key/s are updated.`, updateAPIKeys));
  } catch (error) {
    res
      .status(500)
      .json(
        response(false, `Error while getting the APIs for the user. ${error}`)
      );
  }
});

module.exports = router;
