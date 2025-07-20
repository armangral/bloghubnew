import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Must be a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Must be a valid email address"),
    password: z.string().min(1, "Password is required"),
  }),
});

export const postSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(3, "Title is required and must be at least 3 characters"),
    content: z
      .string()
      .min(10, "Content is required and must be at least 10 characters"),
  }),
});
