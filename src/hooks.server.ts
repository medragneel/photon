import { lucia } from "$lib/server/auth/lucia";
import { themes } from "$lib/themes";
import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";


const auth: Handle = async ({ event, resolve }) => {

    const sessionId = event.cookies.get(lucia.sessionCookieName);
    if (!sessionId) {
        event.locals.user = null;
        event.locals.session = null;
        return resolve(event);
    }
    const { session, user } = await lucia.validateSession(sessionId);

    if (session && session.fresh) {
        const sessionCookie = lucia.createSessionCookie(session.id);
        event.cookies.set(sessionCookie.name, sessionCookie.value, {
            path: ".",
            ...sessionCookie.attributes,
        });
    }
    if (!session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        event.cookies.set(sessionCookie.name, sessionCookie.value, {
            path: ".",
            ...sessionCookie.attributes,
        });
    }
    event.locals.user = user;
    event.locals.session = session;
    return resolve(event);

}

const theme: Handle = async ({ event, resolve }) => {
    const theme = event.cookies.get('current-theme')

    if (!theme || !themes.includes(theme)) {

        return await resolve(event)
    }
    return await resolve(event, {
        transformPageChunk: ({ html }) => {
            return html.replace('data-theme=""', `data-theme="${theme}"`)
        },
    })

}
export const handle = sequence(auth, theme);
