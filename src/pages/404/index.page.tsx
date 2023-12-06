import { Container, Title, Text, Button, Group, rem, createStyles } from "@mantine/core"

import Link from "next/link"
import { Routes } from "@blitzjs/next"
import Layout from "~/core/layouts/Layout"
import { Illustration } from "./Illustration"

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(80),
    paddingBottom: rem(80),
  },

  inner: {
    position: "relative",
  },

  image: {
    ...theme.fn.cover(),
    opacity: 0.75,
  },

  content: {
    paddingTop: rem(220),
    position: "relative",
    zIndex: 1,

    [theme.fn.smallerThan("sm")]: {
      paddingTop: rem(120),
    },
  },

  title: {
    fontFamily: "Greycliff CF, ${theme.fontFamily}",
    textAlign: "center",
    fontWeight: 900,
    fontSize: rem(38),

    [theme.fn.smallerThan("sm")]: {
      paddingTop: rem(32),
    },
  },

  description: {
    maxWidth: rem(540),
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: "calc(${theme.spacing.xl}) * 1.5)",
  },
}))

export function NothingFoundBackground() {
  const { classes } = useStyles()
  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <Illustration className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>Nothing to see here</Title>
          <Text c="dimmed" size="lg" ta="center" className={classes.description}>
            Page you are trying to open does not exist. You may have mistyped the address, or the
            page has been moved to another URL. If you think this is an error contact support.
          </Text>
          <Group position="center">
            <Button size="md" component={Link} href={Routes.Home()}>
              Take me back to home page
            </Button>
          </Group>
        </div>
      </div>
    </Container>
  )
}

export default function Page404() {
  return (
    <Layout>
      <NothingFoundBackground />
    </Layout>
  )
}
