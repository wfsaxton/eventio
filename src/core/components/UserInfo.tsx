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
          User: {currentUser.name}
          <code>({currentUser.id})</code>
        </Text>
        <Text>
          Role: <code>{currentUser.role}</code>
        </Text>
      </Vertical>
    </>
  )
}

export default UserInfo
