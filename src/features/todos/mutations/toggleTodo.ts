import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const Input = z.object({
  id: z.string(),
  done: z.boolean(),
})

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({ id, done }, { session: { userId } }) => {
    const todo = await db.todo.update({
      where: { id },
      data: { done: done },
    })

    return todo
  }
)
