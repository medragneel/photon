import { error } from '@sveltejs/kit';

export const load = ({ locals }) => {
    if (!locals.user || !locals.user.isAdmin) {
        throw error(403, 'Unauthorized: You do not have permission to access this page.');
    }
}

