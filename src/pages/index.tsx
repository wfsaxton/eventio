import { Suspense } from "react"
import Layout from "~/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { UserInfo } from "~/core/components/UserInfo"

const Home: BlitzPage = () => {
  return (
    <Layout title="Home">
      <Suspense fallback="Loading...">
        <UserInfo />
      </Suspense>
    </Layout>
  )
}

export default Home
