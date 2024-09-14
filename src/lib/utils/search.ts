
import FlexSearch from "flexsearch"

export type Product = {
    prodId: string;
    name: string;
    description: string;
    category: 'anime' | 'movie' | 'sport' | 'custom';
};


let prodIndex: FlexSearch.Index
let searchProducts: Product[]


export function createProdIndex(data: Product[]) {
    prodIndex = new FlexSearch.Index({ tokenize: "forward" })
    data.forEach((p, i) => {
        const item = `${p.prodId} ${p.name} ${p.category} ${p.description}`
        prodIndex.add(i, item)

    });
    searchProducts = data
}

export function searchProdIndex(searchTerm: string) {
    const match = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const results = prodIndex.search(match)
    return results
        .map((index) => searchProducts[index as number])
        .map(({ prodId, name, category, description }) => {
            return {
                prodId,
                name,
                category,
                description
            }

        })
}

