const jwt = require("jsonwebtoken");
const { User, Blacklist, Sessions } = require("../models"); // Adjust based on your setup
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

const authenticateToken = async (req, res, next) => {
  // Skip authentication for the register route
  if (
    (req.path === "/api/users/register" && req.method === "POST") ||
    (req.path === "/api/users/login" && req.method === "POST")
  ) {
    return next();
  }

  // Extract token from Authorization header
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token required" });
  }

  try {
    // Check if token is sessions
    const sessionsCheck = await Sessions.findOne({ where: { token } });
    if (!sessionsCheck) {
      return res.status(401).json({ error: "Token is invalid" });
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach user information to request
    req.user = decoded;

    next();
  } catch (err) {
    console.error(err);
    res.status(403).json({ error: "Invalid token" });
  }
};

module.exports = authenticateToken;
