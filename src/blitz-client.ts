import { AuthClientPlugin } from "@blitzjs/auth"
import { setupBlitzClient } from "@blitzjs/next"
import { BlitzRpcPlugin, getQueryClient } from "@blitzjs/rpc"
import { notifications } from "@mantine/notifications"
import Error from "next/error"
import { invalidateQueries } from "./utils/utils"

export const authConfig = {
  cookiePrefix: "eventio",
}

export const { withBlitz } = setupBlitzClient({
  plugins: [
    AuthClientPlugin(authConfig),
    BlitzRpcPlugin({
      reactQueryOptions: {
        queries: {
          retry: 2,
        },
        mutations: {
          onSuccess: async () => {
            await invalidateQueries()
          },
          onError: async (error: any) => {
            notifications.show({
              color: "red",
              title: "Error",
              message: error.message,
            })
          },
        },
      },
    }),
  ],
})
