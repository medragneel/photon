import { getRandomProducts } from "$lib/server/db/models/products"
export const load = async () => {
    const products = await getRandomProducts()
    console.log('from load page', products)
    return {
        products: products,
    }

}
