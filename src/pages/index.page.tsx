import Layout from "~/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { UserInfo } from "~/core/components/UserInfo"
import { Button } from "@mantine/core"

const Home: BlitzPage = () => {
  return (
    <Layout title="Home">
      <UserInfo />
    </Layout>
  )
}

export default Home
