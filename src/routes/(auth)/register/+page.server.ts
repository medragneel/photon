import { redirect, fail } from "@sveltejs/kit";
import type { RequestEvent } from "./$types";
import { RegisterSchema } from "$lib";
import { setError, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { generateId } from "lucia";
import { lucia } from "$lib/server/auth/lucia";
import { Argon2id } from "oslo/password";
import { createNewUser, getUserByEmail } from "$lib/server/db/models/users";

export async function load(event: RequestEvent) {
    console.log(event.locals.session);
    console.log(event.locals.user);
    return {
        form: await superValidate(zod(RegisterSchema)),
    };
}

export const actions = {
    default: async (event: RequestEvent) => {
        if (event.locals.user) redirect(302, "/");
        const form = await superValidate(event.request, zod(RegisterSchema));
        if (!form.valid) {
            return fail(400, {
                form,
            });
        }

        try {
            const userId = generateId(15);
            const hashed_password = await new Argon2id().hash(form.data.password);
            const [result] = await getUserByEmail(form.data.email);

            if (result) {
                return setError(form, "email", "Email already exist");
            }
            await createNewUser({
                id: userId,
                username: form.data.username,
                email: form.data.email,
                password: hashed_password,
            });
            const session = await lucia.createSession(userId, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            event.cookies.set(sessionCookie.name, sessionCookie.value, {
                path: ".",
                ...sessionCookie.attributes,
            });
        } catch (error) {
            return fail(400, { form, error: "Email already used" });
        }
        throw redirect(302, "/");
    },
};
