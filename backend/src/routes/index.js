import { Router } from "express";
import ticketRoutes from "./ticket.routes.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.status(200).json({ success: true, message: "Backend is healthy" });
});

router.use("/tickets", ticketRoutes);

export default router;
