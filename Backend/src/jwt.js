const response = require("./routes/response");

const middleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token)
      return res.status(401).json(response(false, "Token not provided."));

    const response = await fetch(
      `${process.env.AUTH_API}/api/auth/validate-jwt`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    const { ok, message, body } = await response.json();

    if (!ok) return res.status(401).json(response(false, "Invalid JWT Token."));

    req.user = body.user;
    next();
  } catch (error) {
    res.status(500).json(response(false, "Failed to validate JWT", error));
  }
};

module.exports = { middleware };
