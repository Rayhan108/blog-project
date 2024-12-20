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
const loginValidationSchema = z.object({
    body: z.object({
      email: z.string({ required_error: 'email is required.' }),
      password: z.string({ required_error: 'Password is required' }),
    }),
  });
export const AuthValidation = {
  registerUserValidationSchema,
  loginValidationSchema
  };