import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

if (!process.env.TURSO_CONNECTION_URL && !process.env.TURSO_AUTH_TOKEN) {
    console.log("problem loading .env DATABASE_URL ");
    throw Error("problem loading .env file");
}

// console.log(process.env.TURSO_CONNECTION_URL);
// console.log(process.env.TURSO_AUTH_TOKEN)

const config = {
    schema: "./src/lib/server/db/schema.ts",
    dialect: "sqlite",
    driver: "turso",
    out: "./drizzle",
    dbCredentials: {
        // url: process.env.DATABASE_URL,
        url: process.env.TURSO_CONNECTION_URL,
        authToken: process.env.TURSO_AUTH_TOKEN
    },
    verbose: true,
};

export default config;
