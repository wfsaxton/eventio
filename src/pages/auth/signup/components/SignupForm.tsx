import { useMutation } from "@blitzjs/rpc"
import signup from "~/features/auth/mutations/signup"
import { Button, PasswordInput, TextInput, Title } from "@mantine/core"
import { Routes } from "@blitzjs/next"
import { Vertical } from "mantine-layout-components"
import Link from "next/link"
import { useForm } from "@mantine/form"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  })

  const onSubmit = async (values) => {
    await signupMutation(values)
  }
  return (
    <div>
      <Title>Create an Account</Title>
      <Vertical>
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput withAsterisk label="Email" {...form.getInputProps("email")} />
          <PasswordInput withAsterisk label="Password" {...form.getInputProps("password")} />
          <Button type="submit">Submit</Button>
        </form>
        <Link href={Routes.ForgotPasswordPage()}>Forgot your password?</Link>
        Or <Link href={Routes.LoginPage()}>Log In</Link>
      </Vertical>
    </div>
  )
}

export default SignupForm
