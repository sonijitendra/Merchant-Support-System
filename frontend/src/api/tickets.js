import apiClient from "./axios";

const buildParams = (params) =>
  Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== "" && value !== null)
  );

export const fetchTickets = async (params) => {
  const { data } = await apiClient.get("/tickets", {
    params: buildParams(params),
  });

  return data;
};

export const createTicket = async (payload) => {
  const { data } = await apiClient.post("/tickets", payload);
  return data;
};

export const updateTicketStatus = async (ticketId, status) => {
  const { data } = await apiClient.patch(`/tickets/${ticketId}`, { status });
  return data;
};
