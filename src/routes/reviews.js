const express = require("express");
const router = express.Router();

const {
  createReview,
  getAllReviews,
  getMyReviews,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");
const isLoggedIn = require("../middleware/isLoggedIn");

// POST /api/reviews/
router.post("/", isLoggedIn, createReview);

//GET /api/reviews
router.get("/", isLoggedIn, getAllReviews);

// GET/ api/ comments/ me; 
router.get("/me", isLoggedIn, getMyReviews);

//UPDATE /api/reviews/:id
router.put("/:id", isLoggedIn, updateReview);

//DELETE /api/reviews/:id
router.delete("/:id", isLoggedIn, deleteReview);

module.exports = router;
