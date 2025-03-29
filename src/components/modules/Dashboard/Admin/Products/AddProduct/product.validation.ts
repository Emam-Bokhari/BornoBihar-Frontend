import { z } from 'zod';

export const ProductSchema = z.object({
    title: z
        .string()
        .trim()
        .max(50, 'Title cannot exceed 50 characters')
        .min(1, 'Title is required'),
    category: z.string().min(1, "Category is required"),
    author: z
        .string()
        .trim()
        .max(50, 'Author cannot exceed 50 characters')
        .min(1, 'Author is required'),
    aboutAuthor: z.string().trim().min(1, 'About Author is required'),
    shipping: z.string().trim().min(1, 'Shipping information is required'),
    returnsPolicy: z.string().trim().min(1, 'Returns policy is required'),
    termsOfSale: z.string().trim().min(1, 'Terms of sale are required'),
    description: z
        .string()
        .trim()
        .max(1000, 'Description cannot exceed 1000 characters')
        .min(1, 'Description is required'),
    price: z
        .string()
        .min(1, 'Price is required')
        .refine(val => !isNaN(Number(val)) && Number(val) >= 0, 'Price cannot be less than 0'),
    images: z.array(z.object({ value: z.string().min(1, "Image URL is required") })).min(1, "At least one image is required"),
    publisher: z
        .string()
        .trim()
        .max(100, 'Publisher cannot exceed 100 characters')
        .min(1, 'Publisher is required'),
    publishedDate: z
        .string()
        .min(1, 'Published date is required'),
    edition: z
        .string()
        .trim()
        .max(50, 'Edition cannot exceed 50 characters')
        .optional(),
    language: z.string().min(1, "Language is required"),
    pages: z
        .string()
        .nullable()
        .optional(),
    rating: z
        .string()
        .min(1, 'Rating is required and must be at least 1')
        .max(5, 'Rating cannot exceed 5')
        .regex(/^[1-5]$/, 'Rating must be a number between 1 and 5'),
    format: z.string().min(1, "Format is required"),
    quantity: z
        .string()
        .min(1, 'Quantity is required')
        .refine(val => !isNaN(Number(val)) && Number(val) >= 0, 'Quantity cannot be less than 0')
});
