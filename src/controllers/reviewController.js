const { prisma } = require("../utils/common");

//POST /api/reviews
const createReview = async (req, res, next) => {
  try {
    const { text, rating, itemID } = req.body;
    if (!text || !rating || !itemID) {
      return res
        .status(400)
        .json({ error: "text, rating and itemID are required" });
    }

    const review = await prisma.review.create({
      data: {
        text,
        rating,
        item: { connect: { id: itemID } },
        user: { connect: { id: req.user.id } },
      },
    });

    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
};

const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: "desc" },
    });
    if (!reviews) res.status(400).json({ error: "Reviews not found." });
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

//GET /api/items/:itemId/reviews/:reviewId
const getSingleReview = async (req, res, next) => {
  try {
    const { itemId, reviewId } = req.params;
    const review = await prisma.review.findFirst({
      where: { id: reviewId, itemId },
      include: {
        user: { select: { id: true, username: true } },
        comments: { select: { id: true, text: true, createdAt: true } },
      },
    });
    if (!review) return res.status(404).json({ error: "Review not found." });
    res.json(review);
  } catch (error) {
    next(error);
  }
};

// GET / api / review / me;  🔒protected
const getMyReviews = async (req, res, next) => {
  try {
    const myReviews = await prisma.review.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
    });
    if (!myReviews)
      return res.status(404).json({ error: "User Reviews not found." });
    res.json(myReviews);
  } catch (error) {
    next(error);
  }
};

const updateReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const review = await prisma.review.findUnique({
      where: { id },
    });
    if (!review || !review.userId == req.user.id) {
      res.status(401).json({ error: "Not autohorized to update this review" });
    }

    const update = await prisma.review.update({
      where: { id },
      data: { text },
      include: { comments: true },
    });
    res.json(update);
    //res.json(review);
  } catch (error) {
    next(error);
  }
};

//DELETE api/reviews/reviewId
const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await prisma.review.findUnique({
      where: { id },
    });
    if (!review || !review.userId == req.user.id) {
      res.status(403).json({ error: "Not authorized to delete this review" });
    }
    await prisma.review.delete({
      where: { id },
    });
    res.status(201).json({ message: "Review deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  getMyReviews,
  updateReview,
  deleteReview,
};
