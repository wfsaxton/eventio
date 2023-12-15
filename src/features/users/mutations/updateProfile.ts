import { resolver } from "@blitzjs/rpc"
import { NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"
import { UpdateProfileInput } from "~/features/users/schemas"

export default resolver.pipe(
  resolver.zod(UpdateProfileInput),
  resolver.authorize(),
  async (params, ctx) => {
    const userId = ctx.session.userId

    const userCurrent = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
      },
    })

    if (!userCurrent) throw new NotFoundError("User not found")

    const user = await db.user.update({
      where: { id: userId },
      data: params,
      select: { bio: true },
    })

    return user
  }
)
