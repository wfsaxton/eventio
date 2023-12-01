import Layout from "~/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { UserInfo } from "~/core/components/UserInfo"
import { useCurrentUser } from "~/features/users/hooks/useCurrentUser"
import { Vertical } from "mantine-layout-components"
import { AuthenticationForm } from "~/core/components/AuthenticationForm"

const Home: BlitzPage = () => {
  const currentUser = useCurrentUser()

  return (
    <Layout title="Home">
      {currentUser && <UserInfo />}
      <Vertical fullH fullW center>
        {!currentUser && <AuthenticationForm />}
      </Vertical>
    </Layout>
  )
}

export default Home
