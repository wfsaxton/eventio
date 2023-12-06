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
    <MantineProvider withGlobalStyles withNormalizeCSS theme={mantineTheme}>
      <ErrorBoundary FallbackComponent={RootErrorFallback}>
        <Notifications position="top-right" />
        <Suspense fallback={<Loader />}>
          <Component {...pageProps} />
        </Suspense>
      </ErrorBoundary>
    </MantineProvider>
  )
}

export default withBlitz(MyApp)
