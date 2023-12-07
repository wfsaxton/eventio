import { ErrorFallbackProps } from "@blitzjs/next"
import { AuthenticationError, AuthorizationError } from "blitz"
import React from "react"
import { AuthenticationForm } from "./AuthenticationForm"
import { ReactFC } from "mantine-layout-components/dist/types"
import { Vertical } from "mantine-layout-components"
import { Text } from "@mantine/core"

const ErrorComponent: ReactFC<{ statusCode: string | number; title: string }> = ({
  statusCode,
  title,
}) => {
  return (
    <Vertical center fullW spacing="xs">
      <Text fz="md" fw="bold">
        {statusCode}
      </Text>
      <Text fz="md">An error occurred :(</Text>
      <Text>{title}</Text>
    </Vertical>
  )
}

export function RootErrorFallback({ error }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <AuthenticationForm />
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error.message || error.name}
      />
    )
  }
}
