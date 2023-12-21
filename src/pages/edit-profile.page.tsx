import { BlitzPage, Routes } from "@blitzjs/next"
import Layout from "~/core/layouts/Layout"
import { Vertical } from "mantine-layout-components"
import { Button, Text } from "@mantine/core"
import EditProfileForm from "~/features/users/forms/EditProfileForm"
import { useRouter } from "next/router"
import { showNotification } from "@mantine/notifications"
import { useForm, zodResolver } from "@mantine/form"
import { UpdateProfileFormType, UpdateProfileInput } from "~/features/users/schemas"
import { useMutation, useQuery } from "@blitzjs/rpc"
import updateProfile from "~/features/users/mutations/updateProfile"
import { invalidateQueries } from "~/utils/utils"
import getUserForEditingProfile from "~/features/users/queries/getUserForEditingProfile"

export const EditProfilePage: BlitzPage = () => {
  const [user, { refetch }] = useQuery(getUserForEditingProfile, {})

  const router = useRouter()
  const form = useForm<UpdateProfileFormType>({
    validate: zodResolver(UpdateProfileInput),
    validateInputOnBlur: true,
    initialValues: {
      name: user?.name || "",
      username: user?.username || "",
      bio: user?.bio || "",
    },
  })
  const [$updateProfile, { isLoading }] = useMutation(updateProfile, {
    onSuccess: async (user) => {
      await invalidateQueries()
    },
  })

  return (
    <Layout>
      <Vertical spacing="md">
        <EditProfileForm
          form={form}
          onSubmit={async (values) => {
            await $updateProfile(values)
            const { username } = values
            if (username) await router.push(Routes.ProfilePage({ username }))
            showNotification({
              color: "green",
              title: "Success",
              message: "Profile updated successfully",
            })
          }}
          isSubmitting={isLoading}
        />
      </Vertical>
    </Layout>
  )
}

export default EditProfilePage
