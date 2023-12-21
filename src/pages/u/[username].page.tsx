import { BlitzPage, Routes } from "@blitzjs/next"
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
import { Router, useRouter } from "next/router"
import EditProfileForm from "~/features/users/forms/EditProfileForm"

export const ProfilePage: BlitzPage = () => {
  const username = useStringParam("username")

  const UserProfile = ({ username }) => {
    const [user, { refetch }] = useQuery(getUserForProfile, { username })
    const currentUser = useCurrentUser()
    const [opened, { open, close }] = useDisclosure(false)
    const form = useForm<UpdateProfileFormType>({
      validate: zodResolver(UpdateProfileInput),
      validateInputOnBlur: true,
      initialValues: {
        name: user?.name,
        username: user?.username || "",
        bio: user?.bio || "",
      },
    })
    const router = useRouter()

    const isOwner = currentUser?.id === user?.id

    const [$updateProfile, { isLoading }] = useMutation(updateProfile, {
      onSuccess: async (user) => {
        await invalidateQueries()
      },
    })

    if (!user) return <Text>User not found</Text>

    const onEdit = async () => {
      await refetch()
      console.log("user", user)
      form.reset()
      console.log("form", form.values)
      open()
    }

    const onClose = async () => {
      close()
      form.reset()
    }

    return (
      <>
        <Modal opened={opened} onClose={close} title="Edit Profile">
          <EditProfileForm
            form={form}
            onSubmit={async (values) => {
              await $updateProfile(values)
              const { username } = values
              if (username !== user.username) {
                if (username) await router.push(Routes.ProfilePage({ username }))
              }
              showNotification({
                color: "green",
                title: "Success",
                message: "Profile updated successfully",
              })
              close()
            }}
            onClose={onClose}
            isSubmitting={isLoading}
          />
        </Modal>
        <Vertical>
          <Horizontal>
            <Text size="xl">Profile for {user?.username}</Text>
            {isOwner && (
              <ActionIcon size="sm" onClick={onEdit}>
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
