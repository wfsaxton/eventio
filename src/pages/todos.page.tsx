import { BlitzPage } from "@blitzjs/next"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { List, Text, Button, Title, ActionIcon, Input, Checkbox } from "@mantine/core"
import { useForm, zodResolver } from "@mantine/form"
import { notifications } from "@mantine/notifications"
import { IconClearAll, IconPlus, IconX } from "@tabler/icons-react"
import { PromiseReturnType } from "blitz"
import { Horizontal, Vertical } from "mantine-layout-components"
import { useState } from "react"
import { useInput } from "react-hanger"
import { ReactFC } from "types"
import { z } from "zod"
import Layout from "~/core/layouts/Layout"
import addTodo from "~/features/todos/mutations/addTodo"
import cleanCompletedTodos from "~/features/todos/mutations/cleanCompletedTodos"
import deleteTodos from "~/features/todos/mutations/deleteTodos"
import toggleTodo from "~/features/todos/mutations/toggleTodo"
import getMyTodos from "~/features/todos/queries/getTodos"
import { TodoFormType, TodoInput } from "~/features/todos/schemas"
import { invalidateQueries } from "~/utils/utils"

type TodosType = PromiseReturnType<typeof getMyTodos>
type TodoType = TodosType[0]

const TodosPage: BlitzPage = () => {
  const Todo: ReactFC<{
    todo: TodoType
  }> = ({ todo }) => {
    const [$toggleTodo, { isLoading }] = useMutation(toggleTodo)

    return (
      <Horizontal>
        <Checkbox
          checked={todo.done}
          disabled={isLoading}
          onChange={async () => await $toggleTodo({ id: todo.id })}
        />
        <Text>{todo.title}</Text>
      </Horizontal>
    )
  }

  const Todos = () => {
    const [todos] = useQuery(getMyTodos, {})

    const [$addTodo, { isLoading }] = useMutation(addTodo, {
      onSuccess: async (todo) => {
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

    const [$cleanCompletedTodos] = useMutation(cleanCompletedTodos, {
      onSuccess: async (result) => {
        notifications.show({
          title: "Todos cleaned successfully",
          message: "All completed todos were deleted",
        })
        await invalidateQueries()
      },
    })

    const title = useInput("")

    return (
      <Vertical>
        <Horizontal>
          <Input
            {...title.eventBind}
            placeholder="New todo"
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                console.log("ADDING TODO")
                await $addTodo({
                  title: title.value,
                })
                title.setValue("")
              }
            }}
          />
          <ActionIcon
            size="xs"
            onClick={async () => {
              console.log("ADDING TODO")
              await $addTodo({
                title: title.value,
              })
              title.setValue("")
            }}
          >
            <IconPlus />
          </ActionIcon>
          <ActionIcon size="xs" onClick={async () => await $deleteTodos({})}>
            <IconX />
          </ActionIcon>
          <ActionIcon size="xs" onClick={async () => await $cleanCompletedTodos({})}>
            <IconClearAll />
          </ActionIcon>
        </Horizontal>

        <List>
          {todos.map((todo, index) => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </List>
      </Vertical>
    )
  }

  return (
    <Layout title="My Todos">
      <Todos />
    </Layout>
  )
}

export default TodosPage
