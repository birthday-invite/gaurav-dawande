import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const rsvps = pgTable("rsvps", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  guestCount: integer("guest_count").notNull().default(1),
  // Status: "attending" or "declined"
  status: text("status").notNull().default("attending"),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertRsvpSchema = createInsertSchema(rsvps).omit({ 
  id: true, 
  createdAt: true 
}).extend({
  guestCount: z.coerce.number().min(1, "At least one guest is required"),
  email: z.string().email().optional().or(z.literal("")),
});

export type Rsvp = typeof rsvps.$inferSelect;
export type InsertRsvp = z.infer<typeof insertRsvpSchema>;
