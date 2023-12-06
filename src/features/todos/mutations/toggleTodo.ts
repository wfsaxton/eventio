import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { NotFoundError } from "blitz"

const Input = z.object({
  id: z.string(),
})

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({ id }, { session: { userId } }) => {
    const todoCurrent = await db.todo.findFirst({
      where: {
        id: id,
        userId: userId,
      },
      select: {
        done: true,
      },
    })

    if (!todoCurrent) throw new NotFoundError("Todo not found")

    const todo = await db.todo.update({
      where: { id },
      data: { done: !todoCurrent.done },
    })

    return todo
  }
)
