import { fetchAllProducts, getTotal } from "$lib/server/db/models/products";
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

