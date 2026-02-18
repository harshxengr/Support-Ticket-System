import * as ticketService from "../services/ticket.service.js";
import { classifyTicket } from "../services/llm.service.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const create = async (req, res) => {
  try {
    const ticket = await ticketService.createTicket(req.body);
    return successResponse(res, ticket, 201);
  } catch (error) {
    return errorResponse(res, "Failed to create ticket");
  }
};

export const list = async (req, res) => {
  try {
    const tickets = await ticketService.getTickets(req.query);
    return successResponse(res, tickets);
  } catch {
    return errorResponse(res, "Failed to fetch tickets");
  }
};

export const update = async (req, res) => {
  try {
    const updated = await ticketService.updateTicket(req.params.id, req.body);
    return successResponse(res, updated);
  } catch {
    return errorResponse(res, "Ticket not found", 404);
  }
};

export const stats = async (req, res) => {
  try {
    const stats = await ticketService.getStats();
    return successResponse(res, stats);
  } catch {
    return errorResponse(res, "Failed to fetch stats");
  }
};

export const classify = async (req, res) => {
  try {
    const { description } = req.body;
    if (!description) {
      return errorResponse(res, "Description required", 400);
    }

    const result = await classifyTicket(description);

    return successResponse(res, {
      suggested_category: result.category,
      suggested_priority: result.priority
    });
  } catch {
    return errorResponse(res, "Classification failed");
  }
};