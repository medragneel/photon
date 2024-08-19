
import { db } from "$lib/server/db/client";
import { products } from "$lib/server/db/schema";
import { count, eq } from "drizzle-orm";

const fetchAllProducts = async (limit: Number, skip: Number) => {
    return await db.select().from(products).limit(limit).offset(skip);
};
const getTotal = async () => {
    return await db.select({ count: count() }).from(products);
};

const fetchProductById = async (id: string) => {
    const product = await db.select().from(products).where(eq(products.prodId, id))

    return product[0]
}


export { fetchAllProducts, getTotal,fetchProductById }
