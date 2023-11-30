import { ErrorBoundary, AppProps } from "@blitzjs/next"
import { MantineProvider, MantineThemeOverride } from "@mantine/core"
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
        <Suspense fallback="Loading...">
          <Component {...pageProps} />
        </Suspense>
      </MantineProvider>
    </ErrorBoundary>
  )
}

export default withBlitz(MyApp)
