import Image from 'next/image'
import React from 'react'
import { FaRegCalendarCheck, FaRegComments } from 'react-icons/fa'
import pic from "@/assets/Home/PopulerCourse/course2.webp"
import CommentSection from './CommentSection'
import { getSingleBlog } from '@/lib/Helper/getSingleBlog'
import { BlogType } from '@/lib/Types/Types'
import BlogCard from '../Blogs/BlogCard/BlogCard'
export default async function Container({id}:{id:string}) {
  const blogData:BlogType =await getSingleBlog(id)
  
  return (
    <div className="flex-grow">
      <span className='text-lg font-light'>{blogData?.tags[0]}</span>
      <h1 className='text-3xl font-bold pt-3'>{blogData?.name}</h1>
      <div className="flex py-3 gap-3">
          <div className="flex place-items-center gap-2 font-light ">
            <span className="text-primary">
              <FaRegCalendarCheck />
            </span>
            <span>{blogData?.publishDate}</span>
          </div>
          <div className="flex place-items-center gap-2 font-light ">
            <span className="text-primary">
              <FaRegComments />
            </span>
            <span>12 April 2024</span>
          </div>
        </div>
        <div className='py-10'>
            <Image src={blogData?.image} alt='pic' width={2000} height={2000} className=' object-cover max-h-[500px]'/>
        </div>
        <div className='text-slate-600'>
       {blogData?.desc}
        </div>
        <div className='py-7 flex gap-2 place-items-center'>
            <span>Tags: </span>

            {
              blogData?.tags?.map(item=>(
                <button key={item} className='px-3 py-1 border rounded-md transition-all duration-500 hover:bg-primary hover:text-white' >{item}</button>
              ))
            }
           
        </div>
        <CommentSection/>
    </div>
  )
}
