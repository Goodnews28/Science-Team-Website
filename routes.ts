import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEventSchema } from "@shared/schema";

export function registerRoutes(app: Express): Server {
  // Events API endpoints
  app.get("/api/events", async (_req, res) => {
    try {
      const events = await storage.getAllEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });

  app.post("/api/events", async (req, res) => {
    try {
      const eventData = insertEventSchema.parse(req.body);
      const event = await storage.createEvent(eventData);
      res.status(201).json(event);
    } catch (error) {
      res.status(400).json({ message: "Invalid event data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
