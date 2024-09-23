
import Image from 'next/image'
import React from 'react'

import { FaCamera, FaStar } from 'react-icons/fa'
import { getSingleCourse } from '@/lib/Helper/getSingleCourse'
import { getSingleInstructor } from '@/lib/Helper/getSingleInstructor'
import { InstructorType, Student } from '@/lib/Types/Types'
import { GetAvarageRating } from '@/lib/Helper/MakeAvarageeRatings'
import Link from 'next/link'
import { getStudentInfo } from '@/lib/Helper/getStudent'
import ImageBox from './ImageBox'
export default async function Header({id,type}:{id:string,type:string}) {

  
  const user:InstructorType & Student = type!=='student'? await getSingleInstructor(id):await getStudentInfo(["name","image"],id)

  
  const star = new Array(4).fill(<FaStar/>)
  return (
    <div className='bg-dark w-full relative flex justify-center py-7 place-items-end'>
      <div className='bg-white p-10 w-[90%] container   rounded-md bg-gradient-to-r pb-10 from-indigo-200 to-yellow-100 '>
        <div className='flex h-56 flex-col md:flex-row gap-3 place-items-center '>
        <ImageBox image={user?.image} userid={user?._id} type={type}/>
      
         <div>
          <h1 className='md:text-4xl text-xl font-semibold'>{user?.name}</h1>
          {type != 'student' ? <div> <p className='font-light text-sm py-3'>A {user?.title}</p>
          <div className='flex place-items-center gap-1 text-orange'>{star} <span className='text-black'>({user?.ratings?.length} Ratings)</span></div>
          </div>: <p className='font-light text-sm py-3'>A Learner and Student</p> }
         </div>
        </div>
       { type != 'student'&& <div className=' inline-block mx-3'>
          <Link href={`/dashboard/teacher/create-course?id=${id}&name=${user?.name}&type=${type}`} className='px-4   py-2 bg-primary rounded-md text-white'>Create Course </Link>
        </div>}
        {!user?.isAuthor?   <Link href={``} className='px-4   py-2 bg-primary rounded-md text-white'>Became a Author</Link>:<Link href={``} className='px-4   py-2 bg-primary rounded-md text-white'>Create Course </Link>}
      </div>
    </div>
  )
}
