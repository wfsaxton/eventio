import { BlitzPage } from "@blitzjs/next"
import { useQuery } from "@blitzjs/rpc"
import { Loader, List, Text } from "@mantine/core"
import { Vertical } from "mantine-layout-components"
import { Suspense } from "react"
import UserInfo from "~/core/components/UserInfo"
import Layout from "~/core/layouts/Layout"
import getTodos from "~/features/todos/queries/getTodos"
import { useCurrentUser } from "~/features/users/hooks/useCurrentUser"

const Todos: BlitzPage = () => {
  const currentUser = useCurrentUser()
  const [todos] = useQuery(getTodos, {
    search: "test",
  })

  return (
    <Layout title="Home">
      {currentUser && <UserInfo />}
      <Vertical>
        <Suspense fallback={<Loader />}>
          <List>
            {todos.map((todo, index) => (
              <List.Item key={todo.id}>
                <Text>{todo.title}</Text>
              </List.Item>
            ))}
          </List>
        </Suspense>
      </Vertical>
    </Layout>
  )
}

export default Todos
