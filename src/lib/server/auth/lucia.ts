import { Lucia } from "lucia";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "../db/client";
import { sessionTable, user } from "../db/schema";
import { dev } from "$app/environment";

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, user);
console.log(adapter);

if (!adapter) {
    console.error("there's a problem with the adapter");
    throw new Error("there's a problem with the adapter");
}

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            secure: !dev,
        },
    },
    getUserAttributes: (attributes) => {
        return {
            username: attributes.username,
            email: attributes.email,
            isAdmin: attributes.isAdmin,
        };
    },
});

if (!lucia) {
    console.error("there's a problem with the adapter");
    throw new Error("there's a problem with the adapter");
}
declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

interface DatabaseUserAttributes {
    username: string;
    email: string;
    isAdmin: boolean;
}
