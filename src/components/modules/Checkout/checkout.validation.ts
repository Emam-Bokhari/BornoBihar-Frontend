import { z } from "zod";

export const shippingAddressSchema = z.object({
    name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
    phone: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number must not exceed 15 digits"),
    address: z.string().min(1, "Address is required").max(255, "Address must be less than 255 characters"),
    postalCode: z.string().min(4, "Postal code must be at least 4 characters").max(10, "Postal code must not exceed 10 characters"),
    city: z.string().min(1, "City is required").max(100, "City must be less than 100 characters"),
    country: z.string().min(1, "Country is required").max(100, "Country must be less than 100 characters"),
});
