import jwt from "jsonwebtoken";

export const setJWT = (token) => {
  sessionStorage.setItem("jwt", token);
};

export const getJWT = () => {
  return sessionStorage.getItem("jwt");
};

export const decodeJWT = (token) => {
  try {
    const decodedToken = jwt.decode(token);
    return decodedToken;
  } catch (error) {
    console.log("Error while decoding JWT token.", error);
    return null;
  }
};
