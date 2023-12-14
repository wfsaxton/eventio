import { z } from "zod"

export const TodoInput = z.object({
  title: z.string(),
})

export type TodoFormType = z.infer<typeof TodoInput>
