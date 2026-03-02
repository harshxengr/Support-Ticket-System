import { z } from "zod";
import { CATEGORY_VALUES, PRIORITY_VALUES, STATUS_VALUES } from "../utils/constants.js";

export const createTicketSchema = z.object({
  title: z.string().trim().min(3).max(140),
  description: z.string().trim().min(8).max(5000)
});

export const classifyTicketSchema = createTicketSchema;

export const updateStatusSchema = z.object({
  status: z.enum(STATUS_VALUES)
});

export const listTicketsQuerySchema = z.object({
  q: z.string().trim().max(100).optional(),
  status: z.enum(STATUS_VALUES).optional(),
  priority: z.enum(PRIORITY_VALUES).optional(),
  category: z.enum(CATEGORY_VALUES).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10)
});
