import Head from "next/head"
import React, { Suspense } from "react"
import { BlitzLayout } from "@blitzjs/next"

type Props = {
  title?: string
  children?: React.ReactNode
}

const Layout: BlitzLayout<Props> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "eventio"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Suspense fallback="Loading...">{children}</Suspense>
    </>
  )
}

export default Layout
