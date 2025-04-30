const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log error stack in terminal

  res.status(500).json({
    error: err.message || "Internal Server Error", //Send error message to client
  });
};

module.exports = errorHandler;
