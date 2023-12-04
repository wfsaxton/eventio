import { useParam } from "@blitzjs/next"
import { getQueryClient } from "@blitzjs/rpc"

export const useStringParam = (name: string) => useParam(name, "string")
export const invalidateQueries = async () => {
  const queryClient = getQueryClient()
  await queryClient.invalidateQueries()
}
