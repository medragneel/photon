import { relations } from "drizzle-orm";
import {
    pgTable,
    varchar,
    text,
    boolean,
    timestamp,
    integer,
} from "drizzle-orm/pg-core";
import { generateId } from "lucia";

const timestamps = {
    createdAt: integer("created_at")
        .notNull()
        .$defaultFn(() => Math.floor(Date.now() / 1000)),
    updatedAt: integer("updated_at")
        .notNull()
        .$defaultFn(() => Math.floor(Date.now() / 1000)),
};

export const user = pgTable("user", {
    id: text("id").primaryKey().notNull(),
    username: varchar("username", { length: 100 }),
    email: text("email").notNull().unique(),
    isAdmin: boolean("is_admin").default(false),
    password: text("password").notNull(),
    ...timestamps,
});

export const userRelations = relations(user, ({ many }) => ({
    sessions: many(sessionTable)
}));


export const sessionTable = pgTable("session", {
    id: text("id").notNull().primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    expiresAt: timestamp("expires_at", {
        withTimezone: true,
        mode: "date",
    }).notNull(),
    ...timestamps,
});


export const sessionRelations = relations(sessionTable, ({ one }) => ({
    user: one(user, {
        fields: [sessionTable.userId],
        references: [user.id]
    })
}));

export const products = pgTable("products", {
    prodId: text("prod_id").notNull().$defaultFn(() => generateId(20)).primaryKey(),
    name: text("name").notNull(),
    price: integer("price").notNull(),
    description: text('description').notNull(),
    prodImage: text("prod_image").notNull(),
    category: text("category", { enum: ["anime", "movie", "sport", "custom"] }),
    userId: text("userId").references(() => user.id).notNull(),
    ...timestamps,
})

export const orders = pgTable("orders", {
    id: text("id").notNull().$defaultFn(() => generateId(20)).primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    total: integer("total").notNull(),
    status: text("status", { enum: ["pending", "shipped", "delivered", "canceled"] }),
    ...timestamps,

});
export const orderItems = pgTable("order_items", {
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
        fields: [orders.userId],
        references: [user.id],
    }),
    items: many(orderItems, {
        fields: [orders.id],
        references: [orderItems.orderId],
    }),
}));



export const orderItemRelations = relations(orderItems, ({ one, many }) => ({
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

