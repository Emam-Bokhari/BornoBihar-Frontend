import { z } from "zod";

export const blogSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    thumbnail: z.string().url("Invalid URL format").min(1, "Image url is required"),
    category: z.string().min(1, "Category is required"),
    authorName: z.string().min(1, "Author name is required"),
    introduction: z.string().min(1, "Introduction is required"),
    mainContent: z.string().min(10, "Description should be more detailed"),
    tags: z.array(z.string()).optional(),
});