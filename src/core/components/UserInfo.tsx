import { useQuery } from "@blitzjs/rpc"
import { useCurrentUser } from "~/features/users/hooks/useCurrentUser"
import { Text } from "@mantine/core"
import { Vertical } from "mantine-layout-components"

const UserInfo = () => {
  const currentUser = useCurrentUser()

  if (!currentUser) return null

  return (
    <>
      <Vertical>
        <Text>
          User id: <code>{currentUser.id}</code>
        </Text>
        <Text>
          User role: <code>{currentUser.role}</code>
        </Text>
      </Vertical>
    </>
  )
}

export default UserInfo
