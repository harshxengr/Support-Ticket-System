import express from "express";
import cors from "cors";
import ticketRoutes from "./routes/ticket.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tickets", ticketRoutes);

export default app;