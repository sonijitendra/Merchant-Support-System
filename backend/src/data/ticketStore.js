const mongoose = require("mongoose");
const Ticket = require("../models/Ticket");

const memoryTickets = [];

const isMongoReady = () => mongoose.connection.readyState === 1;

const cloneTicket = (ticket) => ({
  ...ticket,
});

const getAllTickets = async () => {
  if (isMongoReady()) {
    return Ticket.find().lean();
  }

  return memoryTickets.map(cloneTicket);
};

const getTicketById = async (ticketId) => {
  if (isMongoReady()) {
    return Ticket.findById(ticketId).lean();
  }

  const ticket = memoryTickets.find((entry) => entry._id === ticketId);
  return ticket ? cloneTicket(ticket) : null;
};

const createTicket = async (payload) => {
  if (isMongoReady()) {
    const ticket = await Ticket.create(payload);
    return ticket.toObject();
  }

  const now = new Date();
  const ticket = {
    _id: new mongoose.Types.ObjectId().toString(),
    subject: payload.subject,
    message: payload.message,
    priority: payload.priority,
    status: "NEW",
    createdAt: now,
    updatedAt: now,
  };

  memoryTickets.unshift(ticket);
  return cloneTicket(ticket);
};

const updateTicketStatus = async (ticketId, nextStatus) => {
  if (isMongoReady()) {
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return null;
    }

    ticket.status = nextStatus;
    await ticket.save();
    return ticket.toObject();
  }

  const ticket = memoryTickets.find((entry) => entry._id === ticketId);

  if (!ticket) {
    return null;
  }

  ticket.status = nextStatus;
  ticket.updatedAt = new Date();
  return cloneTicket(ticket);
};

module.exports = {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicketStatus,
};

