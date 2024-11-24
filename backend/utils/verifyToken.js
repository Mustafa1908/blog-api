const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET || process.env.SECRET_KEY,
    (err, authData) => {
      if (err) {
        console.log("Token verification error:", err);
        return res.status(403).json({ message: "Unauthorized" });
      }

      req.authData = authData;
      next();
    }
  );
};

module.exports = { verifyToken };
