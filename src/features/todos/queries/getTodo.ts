import { resolver } from "@blitzjs/rpc"

export default resolver.pipe(async () => {
  const todo = { id: 1, title: "buy single Walmart" }

  return todo
})
