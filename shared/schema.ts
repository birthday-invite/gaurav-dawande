import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const rsvps = sqliteTable("rsvps", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email"),
  guestCount: integer("guest_count").notNull().default(1),
  // Status: "attending" or "declined"
  status: text("status").notNull().default("attending"),
  message: text("message"),
  createdAt: integer("created_at", { mode: 'timestamp' }).$defaultFn(() => new Date()),
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
