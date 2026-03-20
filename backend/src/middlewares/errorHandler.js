const AppError = require("../utils/appError");

const errorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    next(error);
    return;
  }

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      message: error.message,
      ...(error.errors ? { errors: error.errors } : {}),
    });
    return;
  }

  if (error.name === "ValidationError") {
    const errors = Object.fromEntries(
      Object.entries(error.errors).map(([field, value]) => [field, value.message])
    );

    res.status(400).json({
      message: "Validation failed.",
      errors,
    });
    return;
  }

  if (error.name === "CastError") {
    res.status(400).json({
      message: "Invalid resource identifier.",
    });
    return;
  }

  console.error(error);

  res.status(500).json({
    message: "Something went wrong on the server.",
  });
};

module.exports = errorHandler;

