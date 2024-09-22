import Image from 'next/image'
import React from 'react'
import pic from "@/assets/Home/PopulerCourse/course1.webp"
import { FaRegCalendarCheck } from "react-icons/fa";
function SmallItem(){
    return (
        <div className='flex gap-3 py-3 border-b'>
        <Image src={pic} alt='blog pic' className='w-20 h-20  rounded-md object-cover' width={200} height={200}/>
        <div>
            <h1 className="title line-clamp-2 font-semibold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </h1>
            <span className="date flex place-items-center gap-2 font-light text-xs pt-3">
                <span className='text-primary'><FaRegCalendarCheck/></span>
                <span>12 Sep 2020</span>
            </span>
        </div>
    </div>
    )
}
export default function LatestPost() {
  return (
    <div className='pt-10'>
      <h1 className='text-xl font-light pb-3'>Latest Blogs</h1>
      <div>
      <SmallItem/>
      <SmallItem/>
      <SmallItem/>

      </div>
    </div>
  )
}
