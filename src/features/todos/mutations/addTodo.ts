import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const Input = z.object({
  title: z.string(),
})

export default resolver.pipe(resolver.zod(Input), resolver.authorize(), async (params, ctx) => {
  const { title } = params
  const userId = ctx.session.userId

  console.log(`Creating a todo with the title: ${title} for user ${userId}`)

  const todo = await db.todo.create({
    data: {
      userId: userId,
      title: title,
    },
  })

  return todo
})
