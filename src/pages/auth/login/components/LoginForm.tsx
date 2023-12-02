import { AuthenticationError, PromiseReturnType } from "blitz"
import Link from "next/link"
import { useMutation } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import login from "~/features/auth/mutations/login"
import { useForm } from "@mantine/form"
import { Button, Group, PasswordInput, TextInput, Title } from "@mantine/core"
import { Vertical } from "mantine-layout-components"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [$login] = useMutation(login)

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
    const user = await $login(values)
    props.onSuccess?.(user)
  }

  return (
    <div>
      <Title>Login</Title>
      <Vertical>
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
          />

          <PasswordInput withAsterisk label="Password" {...form.getInputProps("password")} />

          <Button type="submit">Submit</Button>
        </form>
        <Link href={Routes.ForgotPasswordPage()}>Forgot your password?</Link>
        Or <Link href={Routes.SignupPage()}>Sign Up</Link>
      </Vertical>
    </div>
  )
}

export default LoginForm
