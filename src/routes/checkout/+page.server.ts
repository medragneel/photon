import { superValidate } from "sveltekit-superforms";
import type { RequestEvent } from "../$types";
import { z } from "zod"
import { zod } from "sveltekit-superforms/adapters";


const orderSchema = z.object({
    items: z.array(
        z.object({
            prodId: z.string().min(1),
            quantity: z.number().min(1),
            price: z.number().min(1),
        }),
    ),
    total: z.number().min(1),
    status: z.enum(["pending", "shipped", "delivered", "canceled"]),
});


export async function load(event: RequestEvent) {
    const form = superValidate(event.request, zod(orderSchema))

    return {
        form
    }
}
