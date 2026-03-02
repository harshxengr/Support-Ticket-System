import simpleAuthRoutes from "./simple-auth.routes.js";

export function setupAuthRoutes(app) {
  // Use simple auth routes instead of Better Auth for now
  app.use("/api/auth", simpleAuthRoutes);
  
  // Add a test route to verify auth is working
  app.get("/api/auth/test", (req, res) => {
    res.json({ message: "Auth routes are working" });
  });
}
