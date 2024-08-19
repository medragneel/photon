import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

if (!process.env.DATABASE_URL) {
    console.log("problem loading .env DATABASE_URL ");
    throw Error("problem loading .env file");
}

const config = {
    schema: "./src/lib/server/db/schema.ts",
    dialect: "postgresql",
    out: "./drizzle",
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
    verbose: true,
} satisfies Config;

export default config;
