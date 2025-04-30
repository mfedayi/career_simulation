const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { prisma } = require("./utils/common");
const errorHandler = require("./middleware/errorHandler");
const userRouter = require("./routes/users");
const reviewRouter = require("./routes/reviews");
const itemRouter = require("./routes/items");
const commentRouter = require("./routes/comments");

const app = express();
dotenv.config();

app.use(morgan("dev"));
app.use(express.json());

// Temporary test route
app.get("/api/ping", (req, res) => {
  res.send({ msg: "Server is live!" });
});

// Route wiring. (controller will be implemented later)
// import itemRoutes from "./routes/items.js";
// import userRoutes from "./routes/users.js";

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on:  ${PORT}`);
});

// app.use("/api/items", itemRoutes);
app.use("/api/users", userRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/items", itemRouter);
app.use("/api/comments", commentRouter);

// Stays at the bottom
app.use(errorHandler);
