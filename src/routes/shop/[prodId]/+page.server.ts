import { fetchProductById } from "$lib/server/db/models/products";
import type { RequestEvent } from "../$types";

export async function load(event: RequestEvent) {
    const prodId = event.params?.prodId

    try {
        const product = await fetchProductById(prodId)
        console.log(product)
        return {
            product
        }

    } catch (err) {
        console.log(err)

    }

}
