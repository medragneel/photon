import { user } from "../schema";
import { db } from "../client";
import { eq } from "drizzle-orm";

const getUserByEmail = (email: string) => {
    return db.select().from(user).where(eq(user.email, email));
};

const createNewUser = async (data: typeof user.$inferInsert) => {
    return db.insert(user).values(data);
};

export { getUserByEmail, createNewUser };
