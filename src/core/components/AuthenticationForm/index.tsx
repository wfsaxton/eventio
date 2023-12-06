import { useToggle, upperFirst } from "@mantine/hooks"
import { useForm } from "@mantine/form"
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from "@mantine/core"
import { GoogleButton, TwitterButton } from "./SocialButtons"
import { useMutation } from "@blitzjs/rpc"
import login from "~/features/auth/mutations/login"
import { AuthenticationError } from "blitz"
import { FORM_ERROR } from "../Form"
import signup from "~/features/auth/mutations/signup"
import { Vertical } from "mantine-layout-components"

export function AuthenticationForm(props: PaperProps) {
  const [type, toggle] = useToggle(["login", "register"])
  const [$login, { isLoading: isLoggingIn }] = useMutation(login)
  const [$signup, { isLoading: isSigningUp }] = useMutation(signup)
  const isLoading = isLoggingIn || isSigningUp

  const form = useForm({
    initialValues: {
      email: "",
      fullname: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) => (val.length <= 6 ? "Password should include at least 6 characters" : null),
    },
  })

  const onSubmit = async (values: typeof form.values) => {
    if (type === "login") {
      await $login(values)
    } else {
      await $signup(values)
    }
  }

  return (
    <Vertical mih="100vh" fullH fullW center>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" fw={500}>
          Welcome to EventIO, {type} with
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
          <TwitterButton radius="xl">Twitter</TwitterButton>
        </Group>

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form onSubmit={form.onSubmit(onSubmit)}>
          <Stack>
            {type === "register" && (
              <TextInput
                required
                label="Name"
                placeholder="Your name"
                {...form.getInputProps("fullname")}
                radius="md"
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              {...form.getInputProps("email")}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              {...form.getInputProps("password")}
              radius="md"
            />

            {type === "register" && (
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) => form.setFieldValue("terms", event.currentTarget.checked)}
              />
            )}
          </Stack>

          <Group mt="xl">
            <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            <Button loading={isLoading} type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Vertical>
  )
}
