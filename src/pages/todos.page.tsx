import { BlitzPage } from "@blitzjs/next"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { Loader, List, Text, Button, Title, ActionIcon, Input, Checkbox } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { IconPlus, IconX } from "@tabler/icons-react"
import { PromiseReturnType } from "blitz"
import { Horizontal, Vertical } from "mantine-layout-components"
import { Suspense, useState } from "react"
import { ReactFC } from "types"
import Layout from "~/core/layouts/Layout"
import addTodo from "~/features/todos/mutations/addTodo"
import deleteTodos from "~/features/todos/mutations/deleteTodos"
import toggleTodo from "~/features/todos/mutations/toggleTodo"
import getMyTodos from "~/features/todos/queries/getMyTodos"
import { useCurrentUser } from "~/features/users/hooks/useCurrentUser"
import { invalidateQueries } from "~/utils/utils"

type TodosType = PromiseReturnType<typeof getMyTodos>
type TodoType = TodosType[0]

const Todos: BlitzPage = () => {
  const currentUser = useCurrentUser()
  const [todos] = useQuery(getMyTodos, {})
  const [title, setTitle] = useState("")

  const [$addTodo, { isLoading }] = useMutation(addTodo, {
    onSuccess: async (todo) => {
      setTitle("")
      notifications.show({
        title: "Todo added successfully",
        message: todo.title,
      })
      await invalidateQueries()
    },
  })

  const [$deleteTodos] = useMutation(deleteTodos, {
    onSuccess: async (result) => {
      notifications.show({
        title: "Todos deleted successfully",
        message: "All todos were deleted",
      })
      await invalidateQueries()
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

  const Todo: ReactFC<{
    todo: TodoType
  }> = ({ todo }) => {
    const [$toggleTodo, { isLoading }] = useMutation(toggleTodo, {
      onSuccess: async (todo) => {
        // notifications.show({
        //   title: "Todo updated successfully",
        //   message: (todo.done ? "Completed" : "Uncompleted") + " " + todo.title,
        // })
        await invalidateQueries()
      },
    })

    return (
      <Horizontal>
        <Checkbox
          disabled={isLoading}
          checked={todo.done}
          onChange={async () => await $toggleTodo({ id: todo.id, done: !todo.done })}
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
          <ActionIcon size="xs" onClick={handleAddTodo} loading={isLoading}>
            <IconPlus />
          </ActionIcon>
          <ActionIcon size="xs" onClick={async () => await $deleteTodos({})}>
            <IconX />
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
