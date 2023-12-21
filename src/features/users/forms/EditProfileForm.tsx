import { TextInput, Textarea, Button } from "@mantine/core"
import { Form, UseFormReturnType } from "@mantine/form"
import { Horizontal, Vertical } from "mantine-layout-components"
import { ReactFC } from "types"
import { UpdateProfileFormType } from "~/features/users/schemas"

const EditProfileForm: ReactFC<{
  form: UseFormReturnType<UpdateProfileFormType>
  onSubmit: (values: UpdateProfileFormType) => Promise<void>
  onClose?: () => void
  isSubmitting: boolean
}> = ({ onSubmit, onClose, form, isSubmitting }) => {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Form form={form} onSubmit={onSubmit}>
        <Vertical fullW>
          <TextInput required label="Name" placeholder="Name" {...form.getInputProps("name")} />
          <TextInput label="Username" placeholder="Username" {...form.getInputProps("username")} />
          <Textarea label="Bio" placeholder="Bio" {...form.getInputProps("bio")} />
          <Horizontal>
            <Button disabled={!form.isValid()} loading={isSubmitting} type="submit">
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </Horizontal>
        </Vertical>
      </Form>
    </>
  )
}

export default EditProfileForm
