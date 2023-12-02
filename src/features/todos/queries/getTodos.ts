import { resolver } from "@blitzjs/rpc"
import { z } from "zod"

const Input = z.object({
  search: z.string().optional(),
})

export default resolver.pipe(resolver.zod(Input), resolver.authorize(), async ({ search }) => {
  const todos = [
    { id: 1, title: "buy Walmart" },
    { id: 2, title: "buy Target" },
    { id: 3, title: "buy Costco" },
  ]

  return todos
})
