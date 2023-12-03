import { BlitzPage } from "@blitzjs/next"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { Loader, List, Text, Button, Title, ActionIcon, Input } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { IconPlus } from "@tabler/icons-react"
import { Horizontal, Vertical } from "mantine-layout-components"
import { Suspense, useState } from "react"
import UserInfo from "~/core/components/UserInfo"
import Layout from "~/core/layouts/Layout"
import addTodo from "~/features/todos/mutations/addTodo"
import getMyTodos from "~/features/todos/queries/getMyTodos"
import getTodos from "~/features/todos/queries/getTodos"
import { useCurrentUser } from "~/features/users/hooks/useCurrentUser"

const Todos: BlitzPage = () => {
  const currentUser = useCurrentUser()
  const [todos] = useQuery(getMyTodos, {})
  const [title, setTitle] = useState("")

  const [$addTodo] = useMutation(addTodo, {
    onSuccess: (todo) => {
      setTitle("")
      notifications.show({
        title: "Todo added successfully",
        message: todo.title,
      })
    },
  })

  const handleAddTodo = async () => {
    await $addTodo({
      title: title,
    })
  }

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      await $addTodo({
        title: title,
      })
    }
  }

  return (
    <Layout title="Home">
      <Title>My Todos</Title>
      <Vertical>
        <Horizontal>
          <Input
            placeholder="New todo"
            value={title}
            onChange={(event) => setTitle(event.currentTarget.value)}
            onKeyDown={handleKeyDown}
          />
          <ActionIcon size="xs" onClick={handleAddTodo}>
            <IconPlus />
          </ActionIcon>
        </Horizontal>

        <Suspense fallback={<Loader />}>
          <List>
            {todos.map((todo, index) => (
              <List.Item key={todo.id}>
                <Text>{todo.title}</Text>
              </List.Item>
            ))}
          </List>
        </Suspense>
        <br />
        {currentUser && <UserInfo />}
      </Vertical>
    </Layout>
  )
}

export default Todos
