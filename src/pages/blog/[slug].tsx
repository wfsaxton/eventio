import { BlitzPage } from "@blitzjs/next"
import * as React from "react"
import { useStringParam } from "~/utils/utils"

const BlogPostPage: BlitzPage = () => {
  const slug = useStringParam("slug")
  return (
    <div>
      <h1>Blog Post Page: {slug}</h1>
      <p>This is the blog post page: {slug}</p>
    </div>
  )
}

export default BlogPostPage
