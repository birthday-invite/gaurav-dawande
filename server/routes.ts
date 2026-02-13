import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post(api.rsvps.create.path, async (req, res) => {
    try {
      const input = api.rsvps.create.input.parse(req.body);
      const rsvp = await storage.createRsvp(input);
      res.status(201).json(rsvp);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get(api.rsvps.list.path, async (req, res) => {
    const rsvps = await storage.getRsvps();
    res.json(rsvps);
  });

  return httpServer;
}
