import { db } from "./db";
import { rsvps, type InsertRsvp, type Rsvp } from "@shared/schema";

export interface IStorage {
  createRsvp(rsvp: InsertRsvp): Promise<Rsvp>;
  getRsvps(): Promise<Rsvp[]>;
}

export class DatabaseStorage implements IStorage {
  async createRsvp(insertRsvp: InsertRsvp): Promise<Rsvp> {
    const [rsvp] = await db.insert(rsvps).values(insertRsvp).returning();
    return rsvp;
  }

  async getRsvps(): Promise<Rsvp[]> {
    return await db.select().from(rsvps);
  }
}

export const storage = new DatabaseStorage();
