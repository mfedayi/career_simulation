const express = require("express");
const router = express.Router();
const {getSingleReview} = require("../controllers/reviewController");
const {
  createItem,
  getAllItems,
  getSingleItem,
  getItemReviews,
} = require("../controllers/itemController");

const isLoggedIn = require("../middleware/isLoggedIn");

//GET /api/items/item:id/reviews/:reviewId
router.get("/:itemId/reviews/:reviewId", getSingleReview);

// POST /api/items
router.post("/", isLoggedIn, createItem);

//GET api/items
router.get("/", getAllItems);

//GET api/items/:id
router.get("/:itemId", getSingleItem);

//GET /api/items/item:id/reviews
router.get("/:itemId/reviews", getItemReviews);

module.exports = router;
