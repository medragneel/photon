import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
    console.log(event.locals.session);
    console.log(event.locals.user);
    return {
        session: event.locals.session,
        user: event.locals.user,
    };
};
