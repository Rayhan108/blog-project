
import { z } from "zod";

  export const blogValidationSchema = z.object({
    body: z.object({
        title: z.string().min(1, "Title is required"),
        content: z.string().min(1, "Content is required"),  
        author: z.string().optional(),
        isPublished: z.boolean().optional().default(true)
    })
})