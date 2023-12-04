import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const Input = z.object({})

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({}, { session: { userId } }) => {
    const result = await db.todo.deleteMany({
      where: {
        userId: {
          equals: userId,
        },
      },
    })

    console.log("Delete result: ", result)
  }
)
