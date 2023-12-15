import { z } from "zod"

export const fullname = z
  .string()
  .min(2)
  .max(100)
  .transform((str) => str.trim())

export const email = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim())

export const password = z
  .string()
  .min(6)
  .max(100)
  .transform((str) => str.trim())

export const SignupInput = z.object({
  fullname,
  email,
  password,
  terms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
})
