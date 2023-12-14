import { BlitzPage } from "@blitzjs/next"
import Layout from "~/core/layouts/Layout"
import { Horizontal, Vertical } from "mantine-layout-components"
import { ActionIcon, Text } from "@mantine/core"
import { useStringParam } from "~/utils/utils"
import getUserForProfile from "~/features/users/queries/getUserForProfile"
import { useQuery } from "@blitzjs/rpc"
import { IconEdit } from "@tabler/icons-react"
import { useCurrentUser } from "~/features/users/hooks/useCurrentUser"

export const ProfilePage: BlitzPage = () => {
  const username = useStringParam("username")

  const UserProfile = ({ username }) => {
    const [user] = useQuery(getUserForProfile, { username })
    const currentUser = useCurrentUser()

    const isOwner = currentUser?.id === user?.id

    if (!user) return <Text>User not found</Text>

    return (
      <Vertical>
        <Horizontal>
          <Text size="xl">Profile for {user?.username}</Text>
          {isOwner && (
            <ActionIcon size="sm">
              <IconEdit />
            </ActionIcon>
          )}
        </Horizontal>
        <Text>Name: {user?.name}</Text>
        <Text>Bio: {user?.bio}</Text>
      </Vertical>
    )
  }

  return <Layout>{username && <UserProfile username={username} />}</Layout>
}

export default ProfilePage
