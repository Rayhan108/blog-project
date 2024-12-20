import { z } from "zod";

const registerUserValidationSchema = z.object({
    body: z.object({

        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email address"),
        password: z.string(),
        role: z.enum(["admin", "user"]).default("user"),
        isBlocked: z.boolean().default(false),
        createdAt: z.date().default(() => new Date()),
        updatedAt: z.date().default(() => new Date()),
    })
})
export const AuthValidation = {
  registerUserValidationSchema
  };