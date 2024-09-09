
import React from 'react'
import { CourseType } from './CourseCard/CourseCard'
import { MakePegination } from '@/lib/Helper/Pegination'
import Link from 'next/link'
import { TbMathGreater, TbMathLower } from "react-icons/tb";
export default function Pegination({courses,active}:{courses:CourseType[],active:string}) {
  const activeitem = active ? parseInt(active):1
  const end = Math.ceil(courses?.length/9)
  const data = MakePegination(end,activeitem,1)
  const Icondata = data?.map(item=>{
    return <Link  style={activeitem==item ? item.toString().includes(".")?{pointerEvents:"none"}: {background:"#1AB69D",color:"white"}:{}}  key={item} className='md:px-3 px-2 py-2 bg-dark text-[10px] md:text-base rounded-md text-darkBlack' href={`/courses?active=${item}`}>{item}</Link>
  })
  return (
    <div className='flex justify-center pt-6'>
      <div className='flex gap-1'>
       {activeitem>1 && <Link href={`/courses?active=${activeitem-1}`} className='lg:px-3 px-2 py-2 rounded-md text-[10px] md:text-base bg-dark flex justify-center place-items-center text-darkBlack' ><TbMathLower/></Link>}
        {Icondata}
   
        {activeitem!=end && <Link href={`/courses?active=${activeitem+1}`} className='lg:px-3 px-2 rounded-md text-[10px] md:text-base flex justify-center place-items-center bg-dark text-darkBlack' ><TbMathGreater/></Link>}
      </div>
    </div>
  )
}
