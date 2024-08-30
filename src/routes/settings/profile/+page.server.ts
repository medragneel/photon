import { fail, redirect, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import type { RequestEvent } from '../$types';
import { updateUserProfile } from '$lib/server/db/models/users';

const ProfileSchema = z.object({
    username: z.string().min(1),
    email: z.string().email({ message: "please enter a valid email" }),
});

export const load = async (event: RequestEvent) => {

    const user = event.locals.user
    const updateProfileSchema = ProfileSchema.extend({

        username: z.string().min(1).default(user?.username || ""),
        email: z.string().email({ message: "please enter a valid email" }).default(user.email || ""),


    })

    const form = await superValidate(event.request, zod(updateProfileSchema));
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
            console.log(form.data.username)
            await updateUserProfile(locals.user.id, {
                username: form.data.username,
                email: form.data.email
            })
        } catch (error) {
            console.log(error)
            return fail(500, { form, message: error.message });
        }
        throw redirect(302, "/settings/profile")
    }
};
