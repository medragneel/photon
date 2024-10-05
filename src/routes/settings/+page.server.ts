
import { error, redirect } from '@sveltejs/kit';

export const load = ({ locals }) => {

    if (!locals.session) {
        throw redirect(302, "/login")
    }
}



