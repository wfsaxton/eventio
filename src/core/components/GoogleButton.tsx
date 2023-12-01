import { Button, ButtonProps, rem } from "@mantine/core"
import { IconBrandGoogle } from "@tabler/icons-react"

const GoogleButton = (props: ButtonProps & React.ComponentPropsWithoutRef<"button">) => {
  return (
    <Button
      leftIcon={<IconBrandGoogle size={rem(18)} color="#00ACEE" />}
      variant="default"
      {...props}
    />
  )
}

export default GoogleButton
