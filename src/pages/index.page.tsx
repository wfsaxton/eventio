import Layout from "~/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import UserInfo from "~/core/components/UserInfo"
import { useCurrentUser } from "~/features/users/hooks/useCurrentUser"
import { AuthenticationForm } from "~/core/components/AuthenticationForm"

const Home: BlitzPage = () => {
  const currentUser = useCurrentUser()

  return (
    <Layout title="Home">
      {currentUser && <UserInfo />}

      {!currentUser && <AuthenticationForm />}
    </Layout>
  )
}

export default Home
