import { count, eq } from "drizzle-orm"
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

const removeOrderById = async (id: string) => {
    await db.delete(orders).where(eq(orders.id, id))

}


const updateStatus = async (id: string, status: "pending" | "shipped" | "delivered" | "canceled") => {
    const result = await db.update(orders)
        .set({ status: status })
        .where(eq(orders.id, id))
        .returning();
    console.log('Update result:', result);
}

const fetchUserOrders = async (userId: string) => {
    try {
        const userorders = await db.query.orders.findMany({
            where: eq(orders.userId, userId), // Add this line to filter by user ID
            with: {
                orderItems: {
                    with: {
                        product: true,
                    }
                }
            },
        });

        return userorders;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export { createOrder, createOrderItem, fetchAllOrders, getTotal, removeOrderById, updateStatus, fetchUserOrders }
