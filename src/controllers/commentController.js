const { prisma } = require("../utils/common");

const createComments = async (req, res, next) => {
  try {
    const { text, reviewId } = req.body;

    if (!text || !reviewId) {
      res.status(400).json({ error: "text and reviewid is required" });
    }
    const comments = await prisma.comment.create({
      data: {
        text,
        review: { connect: { id: reviewId } },
        user: { connect: { id: req.user.id } },
      },
    });
    res.status(201).json(comments);
  } catch (error) {
    next(error);
  }
};

//GET /api/comments/me  // Protected
const getMyComments = async (req, res, next) => {
  try {
    const comments = await prisma.comment.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
    });
    res.json(comments);
  } catch (error) {
    next(error);
  }
};

//PUT /api/comments/:id
const updateComments = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const comment = await prisma.comment.findUnique({
      where: { id },
    });
    if (!comment || comment.userId !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Not authorized to update this comment" });
    }

    const update = await prisma.comment.update({
      where: { id },
      data: { text },
    });
    res.json(update);
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await prisma.comment.findUnique({
      where: { id },
    });
    if (!comment || comment.userId !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this comment" });
    }
    await prisma.comment.delete({
      where: { id },
    });
    res.json({ message: "Deleted Comment successfully!" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createComments,
  getMyComments,
  updateComments,
  deleteComment,
};
