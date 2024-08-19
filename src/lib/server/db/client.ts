import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

if (!process.env.DATABASE_URL) {
    console.log("problem finding DATABASE_URL from .env");
    throw new Error("problem finding DATABASE_URL from .env");
}

const client = postgres(process.env.DATABASE_URL);
export const db = drizzle(client);
console.log(db);
