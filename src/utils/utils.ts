import { useParam } from "@blitzjs/next"

export const useStringParam = (name: string) => useParam(name, "string")
