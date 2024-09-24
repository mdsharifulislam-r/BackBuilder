import React from 'react'
import image1 from "@/assets/Home/PopulerCourse/course2.webp"
import Image from 'next/image'
import { FaPause, FaPlay } from 'react-icons/fa'
export default function SmaillDetails() {
  return (
    <div className=' py-10'>
      <div className="container grid gap-5 lg:grid-cols-2 md:grid-cols-2 grid-cols-1">
        <div className="image p-5 rounded-md gap-2 grid grid-cols-2 shadow-2xl  " data-aos="fade-right">
            <div className="textBox">
              <div className="box w-[70%] py-3">
                <div className="area p-2  md:text-sm text-[10px] border rounded-full flex justify-center place-items-center">
                  New Collection
                </div>
              </div>
                <h1 className='lg:text-4xl md:text-3xl text-lg font-bold text-primary'>Online Courses from Histudy</h1>
                <p className='text-slate-500 text-sm font-extralight'>Top instructors from around the world</p>
            </div>
            <div className="imageBox relative w-full h-full min-h-56 rounded-lg overflow-hidden ">
                <div className="shade z-20 absolute w-full h-full top-0 flex justify-center place-items-center left-0">
                    <div className="btn btn-circle text-orange bg-white pulser">
                        <FaPlay />
                    </div>
                </div>
                <Image src={image1} className='absolute w-full h-full object-cover ' alt='image' width={300} height={300} />
            </div>
        </div>
        <div className="textbox w-full p-5 h-full shadow-2xl rounded-md" data-aos="fade-left">
        <div className="box py-3">
                <div className="area p-2 text-sm w-1/3  border rounded-full flex justify-center place-items-center">
                  Top Teacher
                </div>
              </div>
            <h1 className='md:text-3xl text-lg font-bold'>Free Online Courses from Histudy School To Education</h1>
            <p className='md:text-xl text-sm font-extralight py-2 text-slate-500'>Top instructors from around the world</p>
            <button className=" px-3 py-2 font-bold bg-primary text-sm rounded-md text-white">Join now</button>
        </div>
      </div>
    </div>
  )
}
