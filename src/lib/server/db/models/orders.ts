import { count } from "drizzle-orm"
import { db } from "../client"
import { orderItems, orders } from "../schema"




const createOrder = async (data: typeof orders.$inferInsert) => {
    await db.insert(orders).values(data).returning({ id: orders.id })

}

const createOrderItem = async (data: typeof orderItems.$inferInsert) => {
    await db.insert(orderItems).values(data)

}

const fetchAllOrders = async (limit: number, skip: number) => {
    try {
        const orders = await db.query.orders.findMany({
            limit: limit,
            offset: skip,
            with: {
                orderItems: {
                    with: {
                        product: true,
                    }
                }
            },
        })

        return orders;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getTotal = async () => {
    return await db.select({ count: count() }).from(orders);


}


export { createOrder, createOrderItem, fetchAllOrders, getTotal }
