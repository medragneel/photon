import { fetchAllOrders, getTotal, removeOrderById, updateStatus } from "$lib/server/db/models/orders";
import { fail } from "@sveltejs/kit";
import type { RequestEvent } from "../../dashboard/$types";

export async function load(event: RequestEvent) {
    const limit: number = Number(event.url.searchParams.get("limit")) || 6;
    const skip: number = Number(event.url.searchParams.get("skip")) || 0;

    try {
        return {
            orders: await fetchAllOrders(limit, skip),
            total: await getTotal(),
            limit,
            skip
        };
    } catch (err) {
        console.error(err);
        return {
            orders: [],
            total: [{ count: 0 }],
            limit,
            skip,
            error: "An error occurred while fetching data"
        };
    }
}


export const actions = {
    removeOrder: async (event: RequestEvent) => {
        const formData = await event.request.formData()
        const pid = formData.get("orderId") ?? ""
        console.log(pid)
        await removeOrderById(pid.toString())

    },
    editStatus: async (event: RequestEvent) => {
        const formData = await event.request.formData();
        console.log(formData)
        const id = formData.get("orderId") ?? "";
        const status = formData.get("editStatus") ?? "pending"; // Get the selected status
        try {
            await updateStatus(id.toString(), status)

        } catch (error) {
            console.log(error)
            return fail(500, { message: "Internal Server Error" });


        }


        // You can now use `pid` and `status` to update the order status in your database
        // await updateOrderStatus(pid.toString(), status.toString());
    }

}

