import app from "./app.js";
import { env } from "./config/env.js";
import { prisma } from "./config/prisma.js";

const server = app.listen(env.PORT, () => {
  process.stdout.write(`Server listening on port ${env.PORT}\n`);
});

const shutdown = async () => {
  process.stdout.write("Shutting down server...\n");
  await prisma.$disconnect();
  server.close(() => process.exit(0));
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
