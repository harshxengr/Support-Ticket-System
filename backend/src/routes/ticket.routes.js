import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import {
  classifyTicketPreview,
  createTicket,
  getDashboardStats,
  getTicketById,
  listTickets,
  updateTicketStatus
} from "../controllers/ticket.controller.js";

const router = Router();

router.post("/classify", asyncHandler(classifyTicketPreview));

router.use(requireAuth);

router.get("/dashboard/stats", asyncHandler(getDashboardStats));
router.get("/", asyncHandler(listTickets));
router.post("/", asyncHandler(createTicket));
router.get("/:id", asyncHandler(getTicketById));
router.patch("/:id/status", requireRole(["ADMIN", "SUPPORT_AGENT"]), asyncHandler(updateTicketStatus));

export default router;
