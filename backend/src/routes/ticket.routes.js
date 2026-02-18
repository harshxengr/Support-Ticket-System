import express from "express";
import * as controller from "../controllers/ticket.controller.js";

const router = express.Router();

router.post("/", controller.create);
router.get("/", controller.list);
router.patch("/:id", controller.update);
router.get("/stats", controller.stats);
router.post("/classify", controller.classify);

export default router;