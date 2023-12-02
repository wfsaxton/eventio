import { ErrorBoundary, AppProps } from "@blitzjs/next"
import { Loader, MantineProvider, MantineThemeOverride } from "@mantine/core"
import { Notifications } from "@mantine/notifications"
import React, { Suspense } from "react"
import { withBlitz } from "~/blitz-client"
import { RootErrorFallback } from "~/core/components/RootErrorFallback"
import "~/styles/globals.css"

const mantineTheme = {
  colorScheme: "dark",
} as MantineThemeOverride

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary FallbackComponent={RootErrorFallback}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={mantineTheme}>
        <Notifications position="top-right" />
        <Suspense fallback={<Loader />}>
          <Component {...pageProps} />
        </Suspense>
      </MantineProvider>
    </ErrorBoundary>
  )
}

export default withBlitz(MyApp)
