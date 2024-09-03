import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { fail } from '@sveltejs/kit';
import { OrderSchema } from "$lib";
import type { RequestEvent } from "../$types";


export const load = async (event: RequestEvent) => {
    const form = await superValidate(event.request, zod(OrderSchema));
    return { form };
};

export const actions = {
    default: async (event: RequestEvent) => {
        const form = await superValidate(event.request, zod(OrderSchema));
        console.log('POST', form);
        console.log('POST', form.data.orderItems);

        if (!form.valid) {
            return fail(400, { form });
        }

        // TODO: Add your form submission logic here
        // This is where you would typically save the order to your database

        return { form };
    }
};
