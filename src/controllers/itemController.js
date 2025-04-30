const { prisma } = require("../utils/common");

//POST /api/items
const createItem = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      res.status(400).json({ error: "name and description are required" });
    }
    const item = await prisma.item.create({
      data: {
        name,
        description,
      },
    });
    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};

// GET /api/items
const getAllItems = async (req, res, next) => {
  try {
    const items = await prisma.item.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(items);
  } catch (error) {
    next(error);
  }
};

// GET /api/items/:id
const getSingleItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const item = await prisma.item.findUnique({
      where: { id: itemId },
      select: {
        name: true,
        description: true,
        createdAt: true,
        reviews: {
          select: {
            id: true,
            text: true,
            rating: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                username: true,
              },
            },
            comments: {
              select: {
                id: true,
                text: true,
                createdAt: true,
                user: {
                  select: {
                    id: true,
                    username: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    if (!item) {
      res.status(400).json({ error: "Item does not exist" });
    }
    res.json(item);
  } catch (error) {
    next(error);
  }
};

//GET /api/items/:itemId/reviews
const getItemReviews = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const itemReviews = await prisma.review.findMany({
      where: { itemId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        text: true,
        rating: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        comments: {
          select: {
            id: true,
            text: true,
            createdAt: true,
          },
        },
      },
    });
    res.json(itemReviews);
  } catch (error) {
    next(error);
  }
};

module.exports = { createItem, getAllItems, getSingleItem, getItemReviews };
