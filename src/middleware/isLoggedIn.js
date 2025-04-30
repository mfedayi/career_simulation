const SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const isLoggedIn = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; // grab auth header with token
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({ error: "Missing or token missing bear" });
    }

    const token = authHeader?.replace("Bearer ", ""); //extract token
    const decodedToken = jwt.verify(token, SECRET); //verify & decode token
    req.user = decodedToken; // Attach payload to req.user
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized or invalid token" });
  }
};
module.exports = isLoggedIn;
