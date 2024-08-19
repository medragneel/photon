import { redirect, fail } from "@sveltejs/kit";
import type { RequestEvent } from "./$types";
import { LoginSchema } from "$lib";
import { setError, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { db } from "$lib/server/db/client";
import { user } from "$lib/server/db/schema";
import { lucia } from "$lib/server/auth/lucia";
import { eq } from "drizzle-orm";
import { Argon2id } from "oslo/password";
import { getUserByEmail } from "$lib/server/db/models/users";

export async function load(event: RequestEvent) {
    console.log(event.locals.session);
    console.log(event.locals.user);
    return {
        form: await superValidate(zod(LoginSchema)),
    };
}

export const actions = {
    default: async (event: RequestEvent) => {
        if (event.locals.user) redirect(302, "/");
        const form = await superValidate(event.request, zod(LoginSchema));
        if (!form.valid) {
            return fail(400, {
                form,
            });
        }

        try {
            const [result] = await getUserByEmail(form.data.email);

            const validPassword = await new Argon2id().verify(
                result.password,
                form.data.password,
            );
            if (!validPassword) {
                return setError(form, "password", "Invalid email or password");
            }
            const session = await lucia.createSession(result.id, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            console.log(session);
            console.log("-------------- ");
            console.log(sessionCookie);
            console.log("-------------- ");
            event.cookies.set(sessionCookie.name, sessionCookie.value, {
                path: ".",
                ...sessionCookie.attributes,
            });
        } catch (error) {
            console.log(error);
            return fail(400, { form, error: "there's a problem login " });
        }
        redirect(302, "/");
    },
};
