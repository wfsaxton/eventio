import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const Input = z.object({
  search: z.string().optional(),
})

export default resolver.pipe(resolver.zod(Input), resolver.authorize(), async ({ search }, ctx) => {
  const userId = ctx.session.userId

  const todos = await db.todo.findMany({
    where: {
      userId: {
        equals: userId,
      },
    },
  })

  return todos
})
