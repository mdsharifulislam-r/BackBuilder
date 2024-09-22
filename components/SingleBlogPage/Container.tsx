import Image from 'next/image'
import React from 'react'
import { FaRegCalendarCheck, FaRegComments } from 'react-icons/fa'
import pic from "@/assets/Home/PopulerCourse/course2.webp"
import CommentSection from './CommentSection'
export default function Container() {
  return (
    <div className="flex-grow">
      <span className='text-lg font-light'>Technology</span>
      <h1 className='text-3xl font-bold pt-3'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. </h1>
      <div className="flex py-3 gap-3">
          <div className="flex place-items-center gap-2 font-light ">
            <span className="text-primary">
              <FaRegCalendarCheck />
            </span>
            <span>12 April 2024</span>
          </div>
          <div className="flex place-items-center gap-2 font-light ">
            <span className="text-primary">
              <FaRegComments />
            </span>
            <span>12 April 2024</span>
          </div>
        </div>
        <div className='py-10'>
            <Image src={pic} alt='pic' width={2000} height={2000} className=' object-cover max-h-[500px]'/>
        </div>
        <div className='text-slate-600'>
        Consectetur adipisicing elit, sed do eiusmod tempor inc idid unt ut labore et dolore magna aliqua enim ad minim veniam, quis nostrud exerec tation ullamco laboris nis aliquip commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores.

Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam.

Aute irure dolor in reprehenderit.
Occaecat cupidatat non proident sunt in culpa.
Pariatur enim ipsam.
        </div>
        <div className='py-7 flex gap-2 place-items-center'>
            <span>Tags: </span>
            <button className='px-3 py-1 border rounded-md transition-all duration-500 hover:bg-primary hover:text-white' >Education</button>
            <button className='px-3 py-1 border rounded-md transition-all duration-500 hover:bg-primary hover:text-white' >Motivation</button>
           
        </div>
        <CommentSection/>
    </div>
  )
}
