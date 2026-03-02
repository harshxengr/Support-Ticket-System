import {
  classifyTicketSchema,
  createTicketSchema,
  listTicketsQuerySchema,
  updateStatusSchema
} from "../validators/ticket.validator.js";
import * as ticketService from "../services/ticket.service.js";
import { classifyTicket } from "../services/gemini.service.js";

export const classifyTicketPreview = async (req, res) => {
  const payload = classifyTicketSchema.parse(req.body);
  const classification = await classifyTicket(payload);

  res.status(200).json({
    success: true,
    data: classification
  });
};

export const createTicket = async (req, res) => {
  const payload = createTicketSchema.parse(req.body);
  const classification = await classifyTicket(payload);

  const ticket = await ticketService.createTicket({
    ...payload,
    category: classification.category,
    priority: classification.priority,
    aiSource: classification.source
  }, req.user.id);

  res.status(201).json({
    success: true,
    data: ticket
  });
};

export const listTickets = async (req, res) => {
  const query = listTicketsQuerySchema.parse(req.query);
  
  const userId = req.user.role === 'CUSTOMER' ? req.user.id : null;
  const result = await ticketService.listTickets(query, userId);

  res.status(200).json({
    success: true,
    data: result.items,
    meta: result.meta
  });
};

export const getTicketById = async (req, res) => {
  const userId = req.user.role === 'CUSTOMER' ? req.user.id : null;
  const ticket = await ticketService.getTicketById(req.params.id, userId);

  res.status(200).json({
    success: true,
    data: ticket
  });
};

export const updateTicketStatus = async (req, res) => {
  const { status } = updateStatusSchema.parse(req.body);
  const userId = req.user.role === 'CUSTOMER' ? req.user.id : null;
  const ticket = await ticketService.updateTicketStatus(req.params.id, status, userId);

  res.status(200).json({
    success: true,
    data: ticket
  });
};

export const getDashboardStats = async (_req, res) => {
  const stats = await ticketService.getTicketStats();

  res.status(200).json({
    success: true,
    data: stats
  });
};
