import { fetchAllProducts, getTotal, removeProductById } from "$lib/server/db/models/products";
import type { RequestEvent } from "../../dashboard/$types";

export async function load(event: RequestEvent) {
    const limit: number = Number(event.url.searchParams.get("limit")) || 6;
    const skip: number = Number(event.url.searchParams.get("skip")) || 0;

    try {

        return {
            products: await fetchAllProducts(limit, skip),
            total: await getTotal(),
            limit,
            skip
        };
    } catch (err) {
        console.error(err);
        return {
            products: [],
            total: [{ count: 0 }],
            limit,
            skip,
            error: "An error occurred while fetching data"
        };
    }
}


export const actions = {
    default: async (event: RequestEvent) => {
        const formData = await event.request.formData()
        const pid = formData.get("prodId") ?? ""
        console.log(pid)
        await removeProductById(pid.toString())

    }
}
