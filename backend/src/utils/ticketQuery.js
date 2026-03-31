const { STATUS_OPTIONS } = require("./constants");

const priorityRank = {
  High: 3,
  Medium: 2,
  Low: 1,
};

const filterTickets = (tickets, query) =>
  tickets.filter((ticket) => {
    if (query.search) {
      const searchTerm = query.search.toLowerCase();

      if (!ticket.subject.toLowerCase().includes(searchTerm)) {
        return false;
      }
    }

    if (query.status && ticket.status !== query.status) {
      return false;
    }

    if (query.priority && ticket.priority !== query.priority) {
      return false;
    }

    return true;
  });

const sortTickets = (tickets, sort) => {
  const nextTickets = [...tickets];

  nextTickets.sort((leftTicket, rightTicket) => {
    if (sort === "priority") {
      const priorityDelta =
        priorityRank[rightTicket.priority] - priorityRank[leftTicket.priority];

      if (priorityDelta !== 0) {
        return priorityDelta;
      }
    }

    return new Date(rightTicket.createdAt) - new Date(leftTicket.createdAt);
  });

  return nextTickets;
};

const paginateTickets = (tickets, page, limit) => {
  const totalItems = tickets.length;
  const startIndex = (page - 1) * limit;

  return {
    items: tickets.slice(startIndex, startIndex + limit),
    totalItems,
  };
};

const buildSummary = (tickets) => ({
  totalTickets: tickets.length,
  openTickets: tickets.filter((ticket) =>
    ["NEW", "INVESTIGATING"].includes(ticket.status)
  ).length,
  resolvedTickets: tickets.filter((ticket) => ticket.status === "RESOLVED").length,
});

module.exports = {
  buildSummary,
  filterTickets,
  paginateTickets,
  sortTickets,
};
