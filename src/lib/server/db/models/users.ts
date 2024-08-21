import { user } from "../schema";
import { db } from "../client";
import { eq } from "drizzle-orm";



const fetchAllUsers = () => {

    return db.select().from(user)

}
const getUserByEmail = (email: string) => {
    return db.select().from(user).where(eq(user.email, email));
};

const createNewUser = async (data: typeof user.$inferInsert) => {
    return db.insert(user).values(data);
};

const removeUserById = async (id: string) => {
    await db.delete(user).where(eq(user.id,id))


}

export { getUserByEmail, createNewUser, fetchAllUsers, removeUserById };
