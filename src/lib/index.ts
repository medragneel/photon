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
