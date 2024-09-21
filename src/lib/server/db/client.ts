// old config with docker postgres db
// import { drizzle } from "drizzle-orm/postgres-js";
// import postgres from "postgres";
// import * as dotenv from "dotenv";
// import * as schema from "./schema";
//
// dotenv.config({ path: ".env" });
//
// if (!process.env.DATABASE_URL) {
//     console.log("problem finding DATABASE_URL from .env");
//     throw new Error("problem finding DATABASE_URL from .env");
// }
//
// const client = postgres(process.env.DATABASE_URL);
// export const db = drizzle(client, {
//     schema
// });
// console.log(db);
// new config with turso
import * as dotenv from "dotenv"
import { drizzle } from "drizzle-orm/libsql"
import { createClient } from "@libsql/client"
import * as schema from "./schema";

dotenv.config({ path: ".env" });

if (!process.env.TURSO_CONNECTION_URL && !process.env.TURSO_AUTH_TOKEN) {
    console.log("problem finding DATABASE_URL from .env");
    throw new Error("problem finding DATABASE_URL from .env");
}



const client = createClient({
    url: process.env.TURSO_CONNECTION_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!
})
export const db = drizzle(client, {
    schema
});
console.log(db);

