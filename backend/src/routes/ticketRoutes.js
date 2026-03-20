const express = require("express");
const ticketController = require("../controllers/ticketController");
const {
  validateCreateTicket,
  validateStatusUpdate,
  validateTicketQuery,
} = require("../middlewares/validateTicket");

const router = express.Router();

router
  .route("/")
  .post(validateCreateTicket, ticketController.createTicket)
  .get(validateTicketQuery, ticketController.getTickets);

router
  .route("/:id")
  .patch(validateStatusUpdate, ticketController.updateTicketStatus);

module.exports = router;

