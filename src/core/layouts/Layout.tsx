import Head from "next/head"
import React, { Suspense } from "react"
import { BlitzLayout, ErrorBoundary, Routes } from "@blitzjs/next"
import {
  Anchor,
  AppShell,
  Button,
  Footer,
  Header,
  Loader,
  Navbar,
  Text,
  Tooltip,
} from "@mantine/core"
import { Horizontal, Vertical } from "mantine-layout-components"
import Link from "next/link"
import { useMutation } from "@blitzjs/rpc"
import logout from "~/features/auth/mutations/logout"
import { useCurrentUser } from "~/features/users/hooks/useCurrentUser"
import { IconUserShield } from "@tabler/icons-react"
import { RootErrorFallback } from "../components/RootErrorFallback"
import { ReactFC } from "types"
import { useRouter } from "next/router"
import FullPageLoader from "../components/FullPageLoader"

const Layout: ReactFC<{
  title?: string
  maxWidth?: number
}> = ({ title, children, maxWidth = 800 }) => {
  const [logoutMutation] = useMutation(logout)
  const currentYear = new Date().getFullYear()
  const user = useCurrentUser()
  const router = useRouter()

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
          <Header height={55} p="xs">
            <Horizontal fullH spaceBetween>
              {/* <Anchor component={Link} href="/">
                Eventio
              </Anchor> */}
              <Horizontal>
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

                {user && <Link href={Routes.TodosPage()}>My Todos</Link>}
              </Horizontal>

              {user && (
                <Horizontal center>
                  {user && (
                    <Text>
                      {user.name}{" "}
                      {user.isAdmin && (
                        <Tooltip label="Admin">
                          <IconUserShield size={15} />
                        </Tooltip>
                      )}
                    </Text>
                  )}
                  <Button
                    size="xs"
                    variant="light"
                    onClick={async () => {
                      await logoutMutation()
                      await router.push(Routes.Home())
                    }}
                  >
                    Logout
                  </Button>
                </Horizontal>
              )}
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
          <ErrorBoundary resetKeys={[user]} FallbackComponent={RootErrorFallback}>
            <Suspense
              fallback={
                <Vertical center fullH fullW>
                  <Loader />
                </Vertical>
              }
            >
              {children}
            </Suspense>
          </ErrorBoundary>
        </Vertical>
      </AppShell>
    </>
  )
}

export default Layout
