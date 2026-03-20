const cors = require("cors");
const express = require("express");
const buildCorsOptions = require("./utils/corsOptions");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");
const requestLogger = require("./middlewares/requestLogger");
const ticketRoutes = require("./routes/ticketRoutes");

const app = express();

app.use(cors(buildCorsOptions()));
app.use(express.json());
app.use(requestLogger);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    message: "Support Ticket API is healthy.",
  });
});

app.use("/api/tickets", ticketRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;

