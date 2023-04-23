const jwt = require("jsonwebtoken");

// Middleware to check whether the a request has a valid access token in the cookie
const verifyJWT = (req, res, next) => {
  // Get token out of the cookie and request
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(401);
  }
  const accessToken = req.cookies.jwt;

  if (!accessToken) {
    return res.status(401).json({ message: "No token provided" });
  } else {
    // Check that if the token is valid and not expired
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        // Add username to request so that next function can use it
        req.username = decoded.username;
        // next calls the next function in the route chain
        next();
      }
    });
  }
};

module.exports = verifyJWT;
