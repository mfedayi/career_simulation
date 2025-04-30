const express = require("express");
const router = express.Router();

const {
  createComments,
  getMyComments,
  updateComments,
  deleteComment,
} = require("../controllers/commentController");
const isLoggedIn = require("../middleware/isLoggedIn");

// POST /api/comments
router.post("/", isLoggedIn, createComments);

//GET /api/comments/me
router.get("/me", isLoggedIn, getMyComments);

//UPDATE /api/comments/:id
router.put("/:id", isLoggedIn, updateComments);

//DELETE /api/comments/:id
router.delete("/:id", isLoggedIn, deleteComment);

module.exports = router;
