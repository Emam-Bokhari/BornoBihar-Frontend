import { z } from "zod";

export const contactSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email format"),
    message: z.string().min(10, "Messages must be at least 10 characters long"),
});