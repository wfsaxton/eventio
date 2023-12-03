import { z } from "zod"

export const fullname = z
  .string()
  .min(1)
  .max(100)
  .transform((str) => str.trim())

export const email = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim())

export const password = z
  .string()
  .min(10)
  .max(100)
  .transform((str) => str.trim())
