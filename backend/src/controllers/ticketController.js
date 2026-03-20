const ticketService = require("../services/ticketService");
const asyncHandler = require("../utils/asyncHandler");

const createTicket = asyncHandler(async (req, res) => {
  const ticket = await ticketService.createTicket(req.body);

  res.status(201).json({
    message: "Ticket created successfully.",
    ticket,
  });
});

const getTickets = asyncHandler(async (req, res) => {
  const result = await ticketService.getTickets(req.query);

  res.status(200).json({
    message: "Tickets retrieved successfully.",
    ...result,
  });
});

const updateTicketStatus = asyncHandler(async (req, res) => {
  const ticket = await ticketService.updateTicketStatus(
    req.params.id,
    req.body.status
  );

  res.status(200).json({
    message: "Ticket status updated successfully.",
    ticket,
  });
});

module.exports = {
  createTicket,
  getTickets,
  updateTicketStatus,
};

