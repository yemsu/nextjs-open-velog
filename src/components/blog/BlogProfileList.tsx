import { BlogResponseData } from "@/types/blog"
import BlogProfile from "./BlogProfile"
import Link from "next/link"
import { PAGES } from "@/constants/path"

interface BlogProfileListProps {
  blogs: BlogResponseData[] | void
}

function BlogProfileList(props: BlogProfileListProps) {
  const { blogs } = props

  if(!blogs) return null
  
  return (
    <ul>
      {
        blogs.map((blog: BlogResponseData) => (
          <li key={blog.id}>
            <Link href={PAGES.USER_BLOG(blog.memberUserId)}>
              <BlogProfile
                blog={blog}
              ></BlogProfile>
            </Link>
          </li>
        ))
      }
    </ul>
  )
}

export default BlogProfileList