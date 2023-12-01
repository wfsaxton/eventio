import { Button, ButtonProps, rem } from "@mantine/core"
import { IconBrandTwitter } from "@tabler/icons-react"

const TwitterButton = (props: ButtonProps & React.ComponentPropsWithoutRef<"button">) => {
  return (
    <Button
      leftIcon={<IconBrandTwitter size={rem(18)} color="#00ACEE" />}
      variant="default"
      {...props}
    />
  )
}

export default TwitterButton
