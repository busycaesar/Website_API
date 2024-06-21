const passport = require("passport");
const passportJWT = require("passport-jwt");
const jwt = require("jsonwebtoken");
const response = require("./routes/response");

// passportJWT.ExtractJwt provides various methods to extract JWT Token from incoming http request.
const ExtractJwt = passportJWT.ExtractJwt;
// passportJWT.Strategy is use to create a new JWT authentication strategy to specify how to extract and verify the JWT and what to do with the decoded payload.
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {
  // It defines how to extract the JWT from incoming request.
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
  // Specifies the secret key used to verify the JWT signature.
  secretOrKey: `${process.env.JWT_KEY}`,
};

// 'JwtStrategy' is the class used to create a new strategy for handling JWT authentication.
// 'jwtOptions' is the configuration options for the strategy which includes the information about how to extract JWT from the request and the secret key to verify the JWT signature.
// The last argument is a call back function that is called once the jwt token is extracted and decoded.
// 'jwt_payload' contains the decoded payload of the JWT which contains the data that was encoded in the token.
// 'next' is the callback function which must be called to pass the result of the authentication process.
const strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
  if (jwt_payload) {
    // Call next by passing 'null' indicating no error and an object containing the user's information.
    next(null, {
      id: jwt_payload.id,
      username: jwt_payload.username,
    });
  }
  // If the token is invalid or missing, the strategy indicates that the authentication has failed.
  else next(null, false);
});

passport.use(strategy);

// This function generates JWT token using id and username.
const generateJWTToken = (id, username) => {
  const payLoad = {
    id: id,
    username: username,
  };

  return jwt.sign(payLoad, jwtOptions.secretOrKey);
};

const matchUserIdWithToken = (req, res, next) => {
  // Get the user id from decoded token as well as from the request params.
  const { id } = req.user;
  const { userId } = req.params;

  // Make sure both id matches.
  if (userId != id)
    return res
      .status(403)
      .json(response(false, "Making GET request with unauthorized token."));

  next();
};

module.exports = {
  jwtOptions,
  passport,
  generateJWTToken,
  matchUserIdWithToken,
};
