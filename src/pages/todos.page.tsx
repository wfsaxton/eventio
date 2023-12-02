import { BlitzPage } from "@blitzjs/next"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { Loader, List, Text, Button } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { Vertical } from "mantine-layout-components"
import { Suspense } from "react"
import UserInfo from "~/core/components/UserInfo"
import Layout from "~/core/layouts/Layout"
import addTodo from "~/features/todos/mutations/addTodo"
import getTodos from "~/features/todos/queries/getTodos"
import { useCurrentUser } from "~/features/users/hooks/useCurrentUser"

const Todos: BlitzPage = () => {
  const currentUser = useCurrentUser()
  const [todos] = useQuery(getTodos, {})
  const [$addTodo] = useMutation(addTodo, {
    onSuccess: (result) => {
      notifications.show({
        title: "Todo added successfully",
        message: result,
      })
    },
  })

  return (
    <Layout title="Home">
      {currentUser && <UserInfo />}
      <Vertical>
        <Button
          onClick={() =>
            $addTodo({
              title: "New todo",
            })
          }
        >
          Add Todo
        </Button>
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
