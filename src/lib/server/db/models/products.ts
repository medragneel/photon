
import { db } from "$lib/server/db/client";
import { products } from "$lib/server/db/schema";
import { count, eq, sql } from "drizzle-orm";

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

const removeProductById = async (id: string) => {
    await db.delete(products).where(eq(products.prodId, id))

}

const createNewProduct = async (data: typeof products.$inferInsert) => {
    await db.insert(products).values(data)

}
const updateProduct = async (id: string, data: Partial<typeof products.$inferInsert>) => {
    await db.update(products).set(data).where(eq(products.prodId, id))

}

const getRandomProducts = () => {

    return db.select().from(products).orderBy(sql`RANDOM()`).limit(3)
}


export { fetchAllProducts, getTotal, fetchProductById, removeProductById, createNewProduct, updateProduct, getRandomProducts }
