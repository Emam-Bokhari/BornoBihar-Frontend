import { z } from "zod";

export const addSupportSchema = z.object({
    name: z.string()
        .min(2, { message: "Name must be at least 2 characters long." })
        .max(50, { message: "Name must not exceed 50 characters." })
        .trim(),

    email: z.string()
        .email({ message: "Please enter a valid email address." })
        .trim(),

    phone: z.string()
        .regex(/^\+?[0-9]{7,15}$/, { message: "Please enter a valid phone number." })
        .optional()
        .or(z.literal("")),
    issueType: z.string().min(1, "Issue type is required"),

    issueDescription: z.string()
        .min(10, { message: "Issue description must be at least 10 characters long." })
        .max(1000, { message: "Issue description must not exceed 1000 characters." })
        .trim(),
});
