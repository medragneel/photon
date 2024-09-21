// src/db/seed.ts
import { faker } from "@faker-js/faker";
import { db } from "./client";
import { products } from "./schema";


const main = async () => {
    const data: (typeof products.$inferInsert)[] = [];

    for (let i = 0; i < 20; i++) {
        data.push({
            name: faker.commerce.productName(),
            price: 2200,
            category: "anime",
            prodImage: "https://placehold.co/600x400",
            description: faker.commerce.productDescription(),
            userId: 'efkht573b7nzo16'

        });
    }

    console.log("Seed start");
    await db.insert(products).values(data);
    console.log("Seed done");
};

main();

