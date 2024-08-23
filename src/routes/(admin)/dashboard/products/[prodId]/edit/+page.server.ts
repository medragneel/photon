import { superValidate } from "sveltekit-superforms"
import type { RequestEvent } from "../$types"
import { ProductCreationSchema } from "$lib"
import { zod } from "sveltekit-superforms/adapters"
import { fail, redirect } from "@sveltejs/kit"
import { createNewProduct, fetchProductById } from "$lib/server/db/models/products"


export async function load(event: RequestEvent) {
    const prodId = event.params["prodId"]
    if (!prodId) {
        return fail(404, { error: "Product ID is required" });
    }

    const product = await fetchProductById(prodId)

    if (!product) {
        return fail(404, { error: "Product not found" });
    }
    console.log(product)
    console.log(prodId)
    const defaults = {
        name: product.name,
        price: product.price,
        prodImage: product.prodImage,
        description: product.description,
        category: product.category

    }
    const form = await superValidate(event.request, zod(ProductCreationSchema), { defaults })
    console.log(form.data)
    return {
        form,
        product
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

