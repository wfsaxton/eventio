import { z } from "zod"
import { fullname } from "~/features/auth/schemas"

export const UpdateProfileInput = z.object({
  name: fullname,
  username: z.string().optional(),
  bio: z.string().optional(),
})

export type UpdateProfileFormType = z.infer<typeof UpdateProfileInput>
