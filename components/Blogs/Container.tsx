import React from 'react'
import BlogCard from './BlogCard/BlogCard'
import { BlogType } from '@/lib/Types/Types'
import { getBlogs } from '@/lib/Helper/getBlogs'

export default async function Container() {
  const data:BlogType[] = await getBlogs()
  const arr = data?.slice(0,9)?.reverse().map(item=>(
    <BlogCard blog={item} key={item?._id}/>
  ))
  return (
    <div className=' place-items-start w-full  grid md:grid-cols-2 grid-cols-1 gap-4 md:px-10 h-fit'>
    {arr}
    </div>
  )
}
