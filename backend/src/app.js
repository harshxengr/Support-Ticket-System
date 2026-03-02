import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import { setupAuthRoutes } from "./routes/auth.routes.js";
import router from "./routes/index.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(helmet());
app.use(cors({ 
  origin: env.CORS_ORIGIN,
  credentials: true
}));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

setupAuthRoutes(app);

app.get("/", (_req, res) => {
  res.status(200).json({ success: true, message: "Support Ticket API" });
});

app.use("/api", router);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
