import { redirect } from "@sveltejs/kit";
import { lucia } from "$lib/server/auth/lucia";

import type { RequestHandler } from "./$types";
export const POST: RequestHandler = async (event) => {
    if (!event.locals.session) redirect(302, "/login");
    await lucia.invalidateSession(event.locals.session.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes,
    });
    redirect(302, "/login");
};
