// import { z } from "zod";

// const createUserValidationSchema = z.object({
//     name: z.string().min(1, "Name is required"),
//     email: z.string().email("Invalid email address"),
//     password: z.string().min(6, "Password must be at least 6 characters long"),
//     role: z.enum(["admin", "user"]).default("user"),
//     isBlocked: z.boolean().default(false),
//     createdAt: z.date().default(() => new Date()),
//     updatedAt: z.date().default(() => new Date()),
// })
// export default {createUserValidationSchema};