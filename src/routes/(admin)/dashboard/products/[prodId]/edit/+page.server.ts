import { superValidate } from "sveltekit-superforms"
import type { RequestEvent } from "../$types"
import { ProductUpdateSchema } from "$lib"
import { zod } from "sveltekit-superforms/adapters"
import { fail, redirect } from "@sveltejs/kit"
import { fetchProductById, updateProduct } from "$lib/server/db/models/products"
import { z } from "zod"


export async function load(event: RequestEvent) {


    const prodId = event.params["prodId"]
    if (!prodId) {
        return fail(404, { error: "Product ID is required" });
    }

    const product = await fetchProductById(prodId)

    if (!product) {
        return fail(404, { error: "Product not found" });
    }

    const updateSchema = ProductUpdateSchema.extend({
        name: z.string().min(1).default(product.name),
        price: z.number().int().default(2200).default(product.price),
        description: z.string().min(1).default(product.description),
        prodImage: z.string().url().default(product.prodImage),
        category: z.enum(["anime", "movie", "sport", "custom"]),

    })
    const form = await superValidate(event, zod(updateSchema))
    console.log(form.data)
    return {
        form,
    }

}

export const actions = {
    default: async (event: RequestEvent) => {
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
        const form = await superValidate(event.request, zod(ProductUpdateSchema))

        console.log(form)
        if (!form.valid) {
            return fail(400, {
                form,
            });
        }


        try {
            const userId = event.locals.user?.id;
            if (!userId) {
                return fail(400, { error: "User ID is required" });
            }

            const currentTimestamp = Math.floor(Date.now() / 1000);

            const updatedprod = {
                prodId: product.prodId,
                name: form.data.name ?? product.name,
                price: form.data.price ?? product.price,
                description: form.data.description ?? product.description,
                prodImage: form.data.prodImage ?? product.prodImage,
                category: form.data.category ?? product.category,
                userId: userId,
                updatedAt: currentTimestamp
            };

            console.log("Updated product data:", updatedprod);

            // Only update fields that are not undefined
            const updateData = Object.fromEntries(
                Object.entries(updatedprod).filter(([_, value]) => value !== undefined)
            );

            console.log("Data to be updated:", updateData);

            await updateProduct(prodId, updateData);
        } catch (error) {
            console.log(error)
            return fail(400, { form, error: "problem updating product" });
        }
        throw redirect(302, "/dashboard/products")




    }
}

