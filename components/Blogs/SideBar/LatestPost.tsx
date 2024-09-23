import Image from 'next/image'
import React from 'react'
import pic from "@/assets/Home/PopulerCourse/course1.webp"
import { FaRegCalendarCheck } from "react-icons/fa";
import { BlogType } from '@/lib/Types/Types';
import { getBlogs } from '@/lib/Helper/getBlogs';
function SmallItem({image,title,date}:{image:string,title:string,date:string}){
    return (
        <div className='flex gap-3 py-3 border-b'>
        <Image src={image} alt='blog pic' className='w-20 h-20  rounded-md object-cover' width={200} height={200}/>
        <div>
            <h1 className="title line-clamp-2 font-semibold">
                {title}
            </h1>
            <span className="date flex place-items-center gap-2 font-light text-xs pt-3">
                <span className='text-primary'><FaRegCalendarCheck/></span>
                <span>{date}</span>
            </span>
        </div>
    </div>
    )
}
export default async function LatestPost() {
  const data:BlogType[] = await getBlogs()
  const arr = data?.slice(0,3)?.reverse()?.map(item=>(
<SmallItem
image={item?.image}
title={item?.name}
date={item?.publishDate}
key={item._id}
/>
  ))
  return (
    <div className='pt-10'>
      <h1 className='text-xl font-light pb-3'>Latest Blogs</h1>
      <div>
    {arr}

      </div>
    </div>
  )
}
