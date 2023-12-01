import Head from "next/head"
import React, { Suspense } from "react"
import { BlitzLayout, Routes } from "@blitzjs/next"
import { Anchor, AppShell, Footer, Header, Navbar, Text } from "@mantine/core"
import { Horizontal, Vertical } from "mantine-layout-components"
import Link from "next/link"

type Props = {
  title?: string
  children?: React.ReactNode
}

const Layout: BlitzLayout<Props> = ({ title, children }) => {
  const currentYear = new Date().getFullYear()

  return (
    <>
      <Head>
        <title>{title || "eventio"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppShell
        padding="md"
        // navbar={
        //   <Navbar width={{ base: 300 }} height={500} p="xs">
        //     {/* Navbar content */}
        //   </Navbar>
        // }
        header={
          <Header height={45} p="xs">
            <Horizontal fullH>
              {/* <Anchor component={Link} href="/">
                Eventio
              </Anchor> */}
              <Anchor
                component={Link}
                href={Routes.Home()}
                fw="bold"
                underline={false}
                color="grey.3"
                size="xl"
              >
                Eventio
              </Anchor>
            </Horizontal>
          </Header>
        }
        footer={
          <Footer height={45} p="xs">
            <Horizontal fullH fullW center>
              <Text fw="xs" color="dimmed">
                Copright {currentYear}
              </Text>
            </Horizontal>
          </Footer>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        })}
      >
        <Vertical fullW fullH>
          <Suspense fallback="Loading...">{children}</Suspense>
        </Vertical>
      </AppShell>
    </>
  )
}

export default Layout
