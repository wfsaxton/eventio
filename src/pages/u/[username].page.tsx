import { BlitzPage } from "@blitzjs/next"
import Layout from "~/core/layouts/Layout"
import { Vertical } from "mantine-layout-components"
import { Text } from "@mantine/core"
import { useStringParam } from "~/utils/utils"

export const ProfilePage: BlitzPage = () => {
  const username = useStringParam("username")

  return (
    <Layout>
      <Vertical spacing="md">
        <Text>Hello {username}</Text>
      </Vertical>
    </Layout>
  )
}

export default ProfilePage
