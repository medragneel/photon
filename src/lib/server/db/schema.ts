import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { generateId } from "lucia";

const timestamps = {
    createdAt: integer("created_at", { mode: "timestamp" })
        .notNull()
        .default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .notNull()
        .default(sql`(unixepoch())`)
};

export const user = sqliteTable("user", {
    id: text("id").primaryKey().notNull(),
    username: text("username", { length: 100 }),
    email: text("email").notNull().unique(),
    isAdmin: integer("is_admin", { mode: 'boolean' }).default(false),
    password: text("password").notNull(),
    ...timestamps,
});
export const userRelations = relations(user, ({ many }) => ({
    sessions: many(sessionTable)
}));

export const sessionTable = sqliteTable("session", {
    id: text("id").notNull().primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    expiresAt: integer("expires_at", { mode: "number" }).notNull(),
    ...timestamps,
});


export const sessionRelations = relations(sessionTable, ({ one }) => ({
    user: one(user, {
        fields: [sessionTable.userId],
        references: [user.id]
    })
}));


export const products = sqliteTable("products", {
    prodId: text("prod_id").notNull().$defaultFn(() => generateId(20)).primaryKey(),
    name: text("name").notNull(),
    price: integer("price").notNull(),
    description: text('description').notNull(),
    prodImage: text("prod_image").notNull(),
    category: text("category", { enum: ["anime", "movie", "sport", "custom"] }),
    userId: text("userId").references(() => user.id).notNull(),
    ...timestamps,
})

export const orders = sqliteTable("orders", {
    id: text("id").notNull().$defaultFn(() => generateId(20)).primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    total: integer("total").notNull(),
    status: text("status", { enum: ["pending", "shipped", "delivered", "canceled"] }),
    fullName: text('fullName'),
    wilaya: text('wilaya', { length: 100 }).notNull(),
    adress: text('adress').notNull(),
    phone: text('phone').notNull(),
    ...timestamps,

});


export const orderItems = sqliteTable("order_items", {
    id: text("id").notNull().$defaultFn(() => generateId(20)).primaryKey(),
    orderId: text("order_id")
        .notNull()
        .references(() => orders.id, { onDelete: "cascade" }),
    prodId: text("prod_id")
        .notNull()
        .references(() => products.prodId, { onDelete: "cascade" }),
    quantity: integer("quantity").notNull(),
    price: integer("price").notNull(),
    ...timestamps,
});

export const orderRelations = relations(orders, ({ one, many }) => ({
    user: one(user, {
        fields: [orders.userId], // Ensure this matches the orders table definition
        references: [user.id],
    }),
    orderItems: many(orderItems),
}));

export const orderItemRelations = relations(orderItems, ({ one }) => ({
    order: one(orders, {
        fields: [orderItems.orderId],
        references: [orders.id],
    }),
    product: one(products, {
        fields: [orderItems.prodId],
        references: [products.prodId],
    }),
}));



export interface DatabaseUser {
    id: string;
    username: string;
    email: string;
    password: string;
}


