import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  // Use a default file if env var is missing during dev
  process.env.DATABASE_URL = "sqlite.db";
}

const sqlite = new Database(process.env.DATABASE_URL);
export const db = drizzle(sqlite, { schema });
