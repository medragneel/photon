import { fetchUserOrders, removeOrderById } from "$lib/server/db/models/orders";
import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";


export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user) redirect(302, "/login")

    const userId = locals.user.id


    return {
        orders: await fetchUserOrders(userId)
    }

}

export const actions: Actions = {
    default: async (event) => {
        const formData = await event.request.formData()
        const pid = formData.get("orderId") ?? ""
        console.log(pid)
        await removeOrderById(pid.toString())

    },

}
