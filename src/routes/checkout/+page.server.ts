import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { fail, redirect } from '@sveltejs/kit';
import { OrderSchema } from "$lib";
import { z } from "zod"
import type { RequestEvent } from "../$types";
import { createOrder, createOrderItem } from "$lib/server/db/models/orders";
import { generateId } from "lucia";

export const load = async (event: RequestEvent) => {
    if (!event.locals.user) return redirect(302, "/login");

    const updatedSchema = OrderSchema.extend({
        fullName: z.string().min(1, "Full name is required").default(event.locals.user.username ?? ""),
    });

    const form = await superValidate(event.request, zod(updatedSchema));
    return { form };
};

export const actions = {
    default: async (event: RequestEvent) => {
        const form = await superValidate(event.request, zod(OrderSchema));

        if (!form.valid) return fail(400, { form });

        const user = event.locals.user;
        if (!user) return fail(401, { message: "Unauthorized" });

        const orderId = generateId(20);

        try {
            await createOrder({
                id: orderId,
                userId: user.id,
                total: form.data.total,
                status: form.data.status,
                fullName: form.data.fullName,
                wilaya: form.data.wilaya.value,
                adress: form.data.adress,
                phone: form.data.phone,
            });

            await Promise.all(form.data.orderItems.map((item) => createOrderItem({
                orderId,
                prodId: item.prodId,
                quantity: item.quantity,
                price: item.price,
            })));

            return { success: true, form };
        } catch (error) {
            console.error("Error creating order:", error);
            return fail(500, { message: "Internal Server Error" });
        }
    },
};
