import { getJWT, decodeJWT } from "./jwt";

export const getAllAPIKeys = async () => {
  // Get JWT token.
  const jwtToken = getJWT();

  // Make sure the JWT token is not null.
  if (!jwtToken) throw new Error("JWT token not found.");

  // Get user id from JWT token.
  const { id } = decodeJWT(jwtToken);

  // Make sure the user id is not null.
  if (!id) throw new Error("UserId not found in the JWT token.");

  try {
    // Make the API request to get the API Keys for the user.
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/api/apikeys/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `jwt ${jwtToken}`,
        },
      }
    );

    // Accept the response.
    const { ok, message, body } = await response.json();

    // Make sure the response is successful.
    if (!ok) throw new Error(message);

    // Return the list of API Keys.
    return body;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const updateAllAPIKeys = async (updatedAPIKeys) => {
  // Get JWT token.
  const jwtToken = getJWT();

  // Make sure the JWT token is not null.
  if (!jwtToken) throw new Error("JWT token not found.");

  // Get user id from JWT token.
  const { id } = decodeJWT(jwtToken);

  // Make sure the user id is not null.
  if (!id) throw new Error("UserId not found in the JWT token.");

  try {
    // Make the API request to get the API Keys for the user.
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/api/apikeys/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `jwt ${jwtToken}`,
        },
        body: JSON.stringify(updatedAPIKeys),
      }
    );

    // Accept the response.
    const { ok, message, body } = await response.json();
    // Make sure the response is successful.
    if (!ok) throw new Error(message);
    // Return the list of API Keys.
    return body;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
