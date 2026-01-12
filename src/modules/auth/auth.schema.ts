import { email, z } from "zod";

export const RegisterSchema = z.object({
  body: z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

export const LoginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

// auto generate typescript Type
export type RegisterDTO = z.infer<typeof RegisterSchema>["body"];
export type LoginDTO = z.infer<typeof LoginSchema>["body"];
