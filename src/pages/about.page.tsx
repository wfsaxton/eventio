import { BlitzPage } from "@blitzjs/next"
import * as React from "react"
import Layout from "~/core/layouts/Layout"

const AboutPage: BlitzPage = () => {
  return (
    <Layout title="About">
      <h1>About Page</h1>
      <p>This is the about page</p>
    </Layout>
  )
}

AboutPage.authenticate = true

export default AboutPage
