import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";

console.log("Initializing Better Auth...");
console.log("DATABASE_URL:", process.env.DATABASE_URL);

try {
  const adapter = prismaAdapter(prisma, {
    provider: "sqlite",
  });
  console.log("Prisma adapter created successfully");
} catch (error) {
  console.error("Error creating Prisma adapter:", error);
}

export const auth = betterAuth({
  baseURL: "http://localhost:5000",
  secret: process.env.BETTER_AUTH_SECRET || "test-secret",
  databaseAdapter: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  socialProviders: {},
});

console.log("Better Auth initialized successfully");
