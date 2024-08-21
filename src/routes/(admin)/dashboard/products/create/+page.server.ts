import { superValidate } from "sveltekit-superforms"
import type { RequestEvent } from "../$types"
import { ProductCreationSchema } from "$lib"
import { zod } from "sveltekit-superforms/adapters"
import { fail, redirect } from "@sveltejs/kit"
import { createNewProduct } from "$lib/server/db/models/products"


export async function load(event: RequestEvent) {
    const form = await superValidate(event.request, zod(ProductCreationSchema))
    return {
        form
    }

}

export const actions = {
    default: async (event: RequestEvent) => {
        const form = await superValidate(event.request, zod(ProductCreationSchema))
        console.log(form)
        if (!form.valid) {
            return fail(400, {
                form,
            });
        }

        const userId = event.locals.user.id
        console.log(userId)

        try {
            console.log(form.data)
            await createNewProduct({
                userId: userId,
                ...form.data
            })


        } catch (error) {
            return fail(400, { form, error: "problem creating new product" });
        }
        throw redirect(302, "/dashboard/products")




    }
}
