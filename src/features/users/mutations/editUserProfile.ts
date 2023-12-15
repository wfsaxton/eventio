import { resolver } from "@blitzjs/rpc"
import { NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const EditProfileInput = z.object({
  id: z.string(),
  bio: z.string(),
})

export default resolver.pipe(
  resolver.zod(EditProfileInput),
  resolver.authorize(),
  async (params, ctx) => {
    const { id, bio } = params
    const userId = ctx.session.userId

    const userCurrent = await db.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
      },
    })

    if (!userCurrent) throw new NotFoundError("User not found")

    const user = await db.user.update({
      where: { id },
      data: { bio: bio },
      select: { bio: true },
    })

    return user
  }
)
