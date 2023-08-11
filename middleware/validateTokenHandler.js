const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization; // Corrected property name to 'headers'

  if (authHeader && authHeader.startsWith("Bearer ")) {
    // Added a space after "Bearer"
    token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = decoded.user; // Attach user data to the request for future middleware/routes

      res.user = decoded.user;

      // Move this line here

      next(); // Call next to proceed to the next middleware/route
    } catch (err) {
      res.status(401);
      throw new Error("User is not Authorized");
    }
  } else {
    res.status(401);
    throw new Error("Bearer token not found");
  }
});

module.exports = validateToken;
