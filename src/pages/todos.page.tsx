import { BlitzPage } from "@blitzjs/next"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { Loader, List, Text, Button, Title, ActionIcon, Input, Checkbox } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { IconPlus } from "@tabler/icons-react"
import { Horizontal, Vertical } from "mantine-layout-components"
import { Suspense, useState } from "react"
import Layout from "~/core/layouts/Layout"
import addTodo from "~/features/todos/mutations/addTodo"
import toggleTodo from "~/features/todos/mutations/toggleTodo"
import getMyTodos from "~/features/todos/queries/getMyTodos"
import { useCurrentUser } from "~/features/users/hooks/useCurrentUser"
import { invalidateQueries } from "~/utils/utils"

const Todos: BlitzPage = () => {
  const currentUser = useCurrentUser()
  const [todos] = useQuery(getMyTodos, {})
  const [title, setTitle] = useState("")

  const [$addTodo] = useMutation(addTodo, {
    onSuccess: async (todo) => {
      setTitle("")
      notifications.show({
        title: "Todo added successfully",
        message: todo.title,
      })
      await invalidateQueries()
    },
  })

  const handleAddTodo = async () => {
    await $addTodo({
      title: title,
    })
  }

  const [$toggleTodo] = useMutation(toggleTodo, {
    onSuccess: async (todo) => {
      notifications.show({
        title: "Todo updated successfully",
        message: (todo.done ? "Completed" : "Uncompleted") + " " + todo.title,
      })
      await invalidateQueries()
    },
  })

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      await $addTodo({
        title: title,
      })
    }
  }

  const Todo = ({ todo }) => {
    return (
      <Horizontal>
        <Checkbox
          checked={todo.done}
          onClick={async () => await $toggleTodo({ id: todo.id, done: !todo.done })}
        />
        <Text>{todo.title}</Text>
      </Horizontal>
    )
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
              <Todo key={todo.id} todo={todo} />
            ))}
          </List>
        </Suspense>
      </Vertical>
    </Layout>
  )
}

export default Todos
