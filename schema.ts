import { pgTable, text, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  role: text("role").notNull().default("member"),
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  type: varchar("type", { length: 50 }).notNull(), // USABO, USNCO, USAPhO, etc.
  location: text("location"),
});

// Create insert schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertEventSchema = createInsertSchema(events).omit({ id: true });

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type User = typeof users.$inferSelect;
export type Event = typeof events.$inferSelect;