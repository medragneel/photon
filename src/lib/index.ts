// place files you want to import through the `$lib` alias in this folder.
//
import { z } from "zod";

export const RegisterSchema = z
    .object({
        username: z.string().min(1).max(32),
        email: z.string().email({ message: "please enter a valid email" }),
        password: z.string().min(8),
        confirm: z.string().min(8),
    })
    .refine((data) => data.password === data.confirm, {
        message: "passwords doesn't matches",
        path: ["confirm"],
    });

export const LoginSchema = z.object({
    email: z.string().email({ message: "please enter a valid email" }),
    password: z.string().min(8),
});



export const ProductCreationSchema = z.object({
    name: z.string().min(1),
    price: z.number().int().default(2200),
    description: z.string().min(1),
    prodImage: z.string().url(),
    category: z.enum(["anime", "movie", "sport", "custom"]),
});

export const ProductUpdateSchema = z.object({
    name: z.string().min(1),
    price: z.number().int().default(2200),
    description: z.string().min(1),
    prodImage: z.string().url(),
    category: z.enum(["anime", "movie", "sport", "custom"]),
});



const OrderStatus = z.enum(["pending", "shipped", "delivered", "canceled"]);
const wilayaSchema = z.object({
    value: z.string(),  // value should be a string
    label: z.string(),  // label should be a string
});

export const OrderItemSchema = z.object({
    prodId: z.string(),
    quantity: z.number().int(),
    price: z.number().int(),
});

export const OrderSchema = z.object({
    total: z.number().int(),
    status: OrderStatus.default("pending"),
    fullName: z.string().min(1, "Full name is required"),
    wilaya: wilayaSchema,
    adress: z.string().min(1, "Address is required"),
    phone: z.string().max(10, "Phone number must be 10 digits").min(1, "Phone number is required"),
    orderItems: z.array(OrderItemSchema),
});



export type Order = z.infer<typeof OrderSchema>;
export type OrderItem = z.infer<typeof OrderItemSchema>;


export const wilayas = [
    "Adrar",
    "Chlef",
    "Laghouat",
    "Oum El Bouaghi",
    "Batna",
    "Béjaïa",
    "Biskra",
    "Béchar",
    "Blida",
    "Bouira",
    "Tamanrasset",
    "Tébessa",
    "Tlemcen",
    "Tiaret",
    "Tizi Ouzou",
    "Alger",
    "Djelfa",
    "Jijel",
    "Sétif",
    "Saïda",
    "Skikda",
    "Sidi Bel Abbès",
    "Annaba",
    "Guelma",
    "Constantine",
    "Médéa",
    "Mostaganem",
    "M'Sila",
    "Mascara",
    "Ouargla",
    "Oran",
    "El Bayadh",
    "Illizi",
    "Bordj Bou Arréridj",
    "Boumerdès",
    "El Tarf",
    "Tindouf",
    "Tissemsilt",
    "El Oued",
    "Khenchela",
    "Souk Ahras",
    "Tipaza",
    "Mila",
    "Aïn Defla",
    "Naâma",
    "Aïn Témouchent",
    "Ghardaïa",
    "Relizane",
];
