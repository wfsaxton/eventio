import { Button, ButtonProps, rem } from "@mantine/core"
import { IconBrandGoogle, IconBrandTwitter } from "@tabler/icons-react"

export const GoogleButton = (props: ButtonProps & React.ComponentPropsWithoutRef<"button">) => {
  return (
    <Button
      leftIcon={<IconBrandGoogle size={rem(18)} color="#00ACEE" />}
      variant="default"
      {...props}
    />
  )
}

export const TwitterButton = (props: ButtonProps & React.ComponentPropsWithoutRef<"button">) => {
  return (
    <Button
      leftIcon={<IconBrandTwitter size={rem(18)} color="#00ACEE" />}
      variant="default"
      {...props}
    />
  )
}
