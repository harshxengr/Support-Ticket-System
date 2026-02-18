import api from "../../api/axios";

export const createTicket = (data) =>
  api.post("/tickets", data);

export const getTickets = (params) =>
  api.get("/tickets", { params });

export const updateTicket = (id, data) =>
  api.patch(`/tickets/${id}`, data);

export const getStats = () =>
  api.get("/tickets/stats");

export const classifyTicket = (description) =>
  api.post("/tickets/classify", { description });