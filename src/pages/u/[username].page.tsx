import { BlitzPage } from "@blitzjs/next"
import Layout from "~/core/layouts/Layout"
import { Horizontal, Vertical } from "mantine-layout-components"
import { ActionIcon, Button, Group, Input, Modal, Text, TextInput } from "@mantine/core"
import { invalidateQueries, useStringParam } from "~/utils/utils"
import getUserForProfile from "~/features/users/queries/getUserForProfile"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { IconEdit } from "@tabler/icons-react"
import { useCurrentUser } from "~/features/users/hooks/useCurrentUser"
import { useDisclosure } from "@mantine/hooks"
import editUserProfile from "~/features/users/mutations/editUserProfile"
import { notifications } from "@mantine/notifications"
import { useInput } from "react-hanger"

export const ProfilePage: BlitzPage = () => {
  const username = useStringParam("username")

  const UserProfile = ({ username }) => {
    const [user] = useQuery(getUserForProfile, { username })
    const currentUser = useCurrentUser()
    const [opened, { open, close }] = useDisclosure(false)
    const bio = useInput(user.bio ? user.bio : "")

    const isOwner = currentUser?.id === user?.id

    const [$editUserProfile, { isLoading }] = useMutation(editUserProfile, {
      onSuccess: async (user) => {
        notifications.show({
          title: "Profile modified successfully",
          message: `Bio: ${user.bio}`,
        })
        await invalidateQueries()
      },
    })

    if (!user) return <Text>User not found</Text>

    return (
      <>
        <Modal opened={opened} onClose={close} title="Edit Profile">
          <Vertical>
            <Horizontal>
              <Text>Bio: </Text>
              <Input {...bio.eventBind} />
            </Horizontal>
            <Horizontal>
              <Button
                onClick={async () => {
                  await $editUserProfile({
                    id: user.id,
                    bio: bio.value,
                  })
                  close()
                }}
              >
                Save
              </Button>
              <Button onClick={close}>Cancel</Button>
            </Horizontal>
          </Vertical>
        </Modal>

        {/* <Group position="center">
          <Button onClick={open}>Open modal</Button>
        </Group> */}
        <Vertical>
          <Horizontal>
            <Text size="xl">Profile for {user?.username}</Text>
            {isOwner && (
              <ActionIcon size="sm" onClick={open}>
                <IconEdit />
              </ActionIcon>
            )}
          </Horizontal>
          <Text>Name: {user?.name}</Text>
          <Text>Bio: {user?.bio}</Text>
        </Vertical>
      </>
    )
  }

  return <Layout>{username && <UserProfile username={username} />}</Layout>
}

export default ProfilePage
