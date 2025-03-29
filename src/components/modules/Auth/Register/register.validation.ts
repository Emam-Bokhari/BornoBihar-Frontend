import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(6, { message: "Full Name must be at least 6 characters long" }),
    email: z
        .string()
        .min(1, { message: "Email or Phone is required" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string(),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });
