import BlogContainer from '@/components/Blogs/BlogContainer'
import Header from '@/components/Common/Header'
import React from 'react'
export const dynamic = "force-dynamic"
function page() {
  return (
    <div>
      <Header path='Blogs'/>
      <BlogContainer/>
    </div>
  )
}

export default page
