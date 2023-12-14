import { SecurePassword } from "@blitzjs/auth/secure-password"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { Role } from "types"
import { SignupInput } from "~/features/auth/schemas"

export default resolver.pipe(
  resolver.zod(SignupInput),
  async ({ fullname, email, password }, ctx) => {
    const hashedPassword = await SecurePassword.hash(password.trim())

    console.log(`Creating user ${fullname}, ${email}, ${hashedPassword}`)

    const user = await db.user.create({
      data: {
        name: fullname.trim(),
        email: email.toLowerCase().trim(),
        hashedPassword,
        role: "USER",
      },
      select: { id: true, name: true, email: true, role: true },
    })

    await ctx.session.$create({ userId: user.id, role: user.role as Role })
    return user
  }
)
