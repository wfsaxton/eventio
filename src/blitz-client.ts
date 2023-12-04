import { AuthClientPlugin } from "@blitzjs/auth"
import { setupBlitzClient } from "@blitzjs/next"
import { BlitzRpcPlugin, getQueryClient } from "@blitzjs/rpc"

export const authConfig = {
  cookiePrefix: "eventio",
}

export const { withBlitz } = setupBlitzClient({
  plugins: [
    AuthClientPlugin(authConfig),
    BlitzRpcPlugin({
      // reactQueryOptions: {
      //   queries: {
      //     retry: 2,
      //   },
      //   mutations: {
      //     // automatically refetches queries when mutation is successful
      //     // this is kind of a hack, but it works
      //     onSuccess: async () => {
      //       const queryClient = getQueryClient()
      //       await queryClient.invalidateQueries()
      //     },
      //   },
      // },
    }),
  ],
})
