const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn")
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");

// POST /api/users/register
router.post("/register", registerUser);

//POST /api/users/login
router.post("/login", loginUser);

//GET /api/users/me
router.get("/me", isLoggedIn, getMe);

module.exports = router;
