const dotenv = require("dotenv");
dotenv.config();

const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken"); 

const SECRET = process.env.JWT_SECRET;

const hashPassword = async (inputPassword) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(inputPassword, salt);
};

// Compare user password with hashed password
const comparePassword = async (inputPassword, hashedPassword) => {
  return await bcrypt.compare(inputPassword, hashedPassword);
};

// Create thesigned token with payload (ex user ID)
const createToken = (payload) => {
  if (!SECRET) {
    throw new Error("JWT_Secret is missing");
  }
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
};

module.exports = {
  hashPassword,
  comparePassword,
  createToken,
};
