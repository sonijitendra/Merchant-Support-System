const AppError = require("../utils/appError");
const {
  buildSummary,
  filterTickets,
  paginateTickets,
  sortTickets,
} = require("../utils/ticketQuery");
const {
  createTicket: persistTicket,
  getAllTickets,
  getTicketById,
  updateTicketStatus: persistTicketStatus,
} = require("../data/ticketStore");
const {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  MAX_LIMIT,
  STATUS_TRANSITIONS,
} = require("../utils/constants");

const parseNumber = (value, fallback) => {
  const parsedValue = Number.parseInt(value, 10);
  return Number.isNaN(parsedValue) ? fallback : parsedValue;
};

const getTickets = async (query) => {
  const page = Math.max(parseNumber(query.page, DEFAULT_PAGE), 1);
  const limit = Math.min(
    Math.max(parseNumber(query.limit, DEFAULT_LIMIT), 1),
    MAX_LIMIT
  );
  const sort = query.sort || "latest";
  const allTickets = await getAllTickets();
  const summary = buildSummary(allTickets);
  const filteredTickets = filterTickets(allTickets, query);
  const sortedTickets = sortTickets(filteredTickets, sort);
  const { items: tickets, totalItems } = paginateTickets(
    sortedTickets,
    page,
    limit
  );

  return {
    tickets,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages: Math.max(1, Math.ceil(totalItems / limit)),
    },
    summary,
  };
};

const createTicket = async (payload) => persistTicket(payload);

const updateTicketStatus = async (ticketId, nextStatus) => {
  if (!/^[a-f\d]{24}$/i.test(ticketId)) {
    throw new AppError("Invalid ticket id.", 400);
  }

  const ticket = await getTicketById(ticketId);

  if (!ticket) {
    throw new AppError("Ticket not found.", 404);
  }

  const allowedTransitions = STATUS_TRANSITIONS[ticket.status] || [];

  if (!allowedTransitions.includes(nextStatus)) {
    throw new AppError(
      `Status transition from ${ticket.status} to ${nextStatus} is not allowed.`,
      400
    );
  }

  return persistTicketStatus(ticketId, nextStatus);
};

module.exports = {
  createTicket,
  getTickets,
  updateTicketStatus,
};
