import { Promo } from '@/app/api/promo/promocourse/route'
import { ModulePropsType } from '@/components/SingleCourseDetails/Curriculum/Module'
import AvarageStar from '@/components/SingleCourseDetails/Reviews/AvarageStar'
import { getVideoLinks } from '@/lib/Helper/getVideoLinks'
import { review } from '@/lib/Types/Types'
import { Span } from 'next/dist/trace'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { FaClock, FaStar, FaStarHalf } from 'react-icons/fa'
import ProgressBar from './ProgressBar'
import { Average } from 'next/font/google'

export interface CourseType{
  _id:string,
    image:string,
    name:string,
    desc:string,
    rate:number,
    duration:string,
    type:string,
    level:string,
    language?:string,
    instructor:{name:string,id:string},
    promovideo?:string,
    module?:ModulePropsType[],
    price:string,
    student?:number,
    certifications?:boolean,
    lessons?:number,
    promocodes?:Promo[],
    pendingStudents?:string[],
    courseStudents?:string[],
    ratings?:review[],
    progress?:boolean,
    stdentCompleteVideos?:string[]

}
export default function CourseCard({image,name,desc,ratings,duration,type,_id,price,level,instructor,module,stdentCompleteVideos,progress}:CourseType) {
  const percent = progress ? getVideoLinks(module||[],stdentCompleteVideos||[]):0
  const lastObject = module && module[module?.length-1]
  const lastVideo = lastObject?.data?.pop()
 
  

  
  return (
    <div data-aos="zoom-in-up" className='w-full h-full max-h-[500px] popUp  grid grid-cols-1 group shadow-lg overflow-hidden transition-all rounded-md duration-700 cursor-pointer'>
      <Link href={`/courses/${_id}`} className="imageBox w-full min-h-48 relative ">
        <div className="shade absolute opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none z-[3] w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.4)]">
            
        </div>
        <div className="absolute z-20 px-4 py-2 rounded-md top-5 left-5 bg-orange text-white text-sm flex gap-1 place-items-center"><FaClock/> {duration}</div>
        
        <Image alt='' width={1000} height={1000} src={image} className='absolute -z-0 object-cover w-full h-full top-0 left-0'/>
      </Link>
      <div className="textBox w-full px-7  py-5 pb-7 flex flex-col gap-2 translate-y-4 transition-all duration-700 group-hover:translate-y-0">
        <div className="type flex justify-between text-xs place-items-center">
        <button className='p-1  bg-primary text-white text-[9px]'>{type}</button>
        <div className="price text-xl text-secondary font-bold capitalize">
        {price!=="free"? `$${price}`:<><span className='p-1 text-sm bg-orange text-white rounded-md'>{price}</span></>}
        </div>
        </div>
        
        <span className='text-xs'>For <span className=' capitalize px-3 py-1 text-white rounded-md bg-orange '>{level}</span></span>
        <h1 className='text-base font-bold line-clamp-2'>{name}
        </h1>
        <span className=' text-sm text-slate-500'>By <span className='text-base font-bold text-orange'>{instructor?.name}</span></span>

        <p className=' line-clamp-2 text-[10px] font-light'>
            {desc}
        </p>
        <div className='text-xs font-extralight flex place-items-center gap-2'>
           {!progress ? <><div className='text-orange flex'><AvarageStar ratings={ratings||[]}/></div><span>({ratings?.length} Ratings)</span></>:<ProgressBar percent={percent}/>}
        </div>
        <div className=''>
           {!progress? <Link href={`/courses/${_id}`} className='px-5 lg:py-2 md:p-2 py-1 text-sm transition-all opacity-0 group-hover:opacity-100 duration-700 group-hover:translate-y-0  rounded-md translate-y-20   bg-secondary text-white'>Enroll Now</Link>
           : <Link href={`/courses/${_id}/${_id}+${lastObject?.moduleId}+${lastVideo?.videoId}`} className='px-5 lg:py-2 md:p-2 py-1 text-sm transition-all opacity-0 group-hover:opacity-100 duration-700 group-hover:translate-y-0  rounded-md translate-y-20   bg-primary text-white'>Continue</Link>}
        </div>
      </div>
    </div>
  )
}
