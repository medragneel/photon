import { fetchAllUsers, removeUserById } from "$lib/server/db/models/users";
import type { RequestEvent } from "../../dashboard/$types";


export async function load() {


    try {
        const users = await fetchAllUsers()
        return {
            users
        }

    } catch (error) {
        console.log(error)
    }

}



export const actions = {
    default: async (event: RequestEvent) => {

        const formData = await event.request.formData()
        const userId = formData.get("id") ?? ""
        console.log(userId)
        await removeUserById(userId.toString())

    }
}
