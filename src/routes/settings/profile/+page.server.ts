import { fail, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import type { RequestEvent } from '../$types';

const ProfileSchema = z.object({
    name: z.string().min(1),
    email: z.string().email({ message: "please enter a valid email" }),
});

export const load = async (event: RequestEvent) => {

    const form = await superValidate(event.request, zod(ProfileSchema));
    console.log(form.data)

    return { form };
};

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const form = await superValidate(request, zod(ProfileSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        if (!locals.user) {
            return fail(401, { form, message: 'Not authenticated' });
        }

        try {
            console.log(form)
            return { form };
        } catch (error) {
            console.log(error)
            return fail(500, { form, message: error.message });
        }
    }
};
