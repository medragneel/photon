import { fetchAllUsers } from "$lib/server/db/models/users";
import type { RequestEvent } from "../../dashboard/$types";


export async function load(event: RequestEvent) {


    try {
        const users = await fetchAllUsers()
        return {
            users
        }

    } catch (error) {
        console.log(error)
    }

}
