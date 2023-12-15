import { BlitzPage } from "@blitzjs/next"
import Layout from "~/core/layouts/Layout"
import { Horizontal, Vertical } from "mantine-layout-components"
import { ActionIcon, Button, Group, Input, Modal, Text, TextInput, Textarea } from "@mantine/core"
import { invalidateQueries, useStringParam } from "~/utils/utils"
import getUserForProfile from "~/features/users/queries/getUserForProfile"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { IconEdit } from "@tabler/icons-react"
import { useCurrentUser } from "~/features/users/hooks/useCurrentUser"
import { useDisclosure } from "@mantine/hooks"
import { notifications, showNotification } from "@mantine/notifications"
import { Form, useForm, zodResolver } from "@mantine/form"
import { UpdateProfileFormType, UpdateProfileInput } from "~/features/users/schemas"
import updateProfile from "~/features/users/mutations/updateProfile"

export const ProfilePage: BlitzPage = () => {
  const username = useStringParam("username")

  const UserProfile = ({ username }) => {
    const [user] = useQuery(getUserForProfile, { username })
    const currentUser = useCurrentUser()
    const [opened, { open, close }] = useDisclosure(false)
    const form = useForm<UpdateProfileFormType>({
      validate: zodResolver(UpdateProfileInput),
      validateInputOnBlur: true,
      // initialValues: user,
    })

    const isOwner = currentUser?.id === user?.id

    const [$updateProfile, { isLoading }] = useMutation(updateProfile, {
      onSuccess: async (user) => {
        await invalidateQueries()
      },
    })

    if (!user) return <Text>User not found</Text>

    return (
      <>
        <Modal opened={opened} onClose={close} title="Edit Profile">
          {/* @ts-expect-error Server Component */}
          <Form
            form={form}
            onSubmit={async (values) => {
              await $updateProfile(values)
              showNotification({
                color: "green",
                title: "Success",
                message: "Profile updated successfully",
              })
              close()
            }}
          >
            <Vertical fullW>
              <TextInput required label="Name" placeholder="Name" {...form.getInputProps("name")} />
              <TextInput
                label="Username"
                placeholder="Username"
                {...form.getInputProps("username")}
              />
              <Textarea label="Bio" placeholder="Bio" {...form.getInputProps("bio")} />
              <Horizontal>
                <Button disabled={!form.isValid()} loading={isLoading} type="submit">
                  Save
                </Button>
                <Button onClick={close}>Cancel</Button>
              </Horizontal>
            </Vertical>
          </Form>
        </Modal>
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
          <Text>Username: {user?.username}</Text>
          <Text>Bio: {user?.bio}</Text>
        </Vertical>
      </>
    )
  }

  return <Layout>{username && <UserProfile username={username} />}</Layout>
}

export default ProfilePage
