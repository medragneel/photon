import { json } from "@sveltejs/kit";
import { fetchAllProducts, getTotal } from "$lib/server/db/models/products";



export const prerender = true

export async function GET() {
    const [total] = await getTotal()
    const products = await fetchAllProducts(total.count, 0)

    return json(products)

}
