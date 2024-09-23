import FloatingBg from '@/components/Common/FloatingbgForHeader/FloatingBg'
import { getSingleBlog } from '@/lib/Helper/getSingleBlog'
import { BlogType } from '@/lib/Types/Types'
import React from 'react'
import { TbMathGreater } from 'react-icons/tb'

export default async function Header({path}:{path:string}) {
  const singleBlog:BlogType = await getSingleBlog(path)
  return (
    <div className='py-24 bg-dark mb-10 relative pointer-events-none'>
    <FloatingBg/>
    <div className='container flex justify-center place-items-center z-30'>
      <div className='flex flex-col  justify-center place-items-center gap-5'>
      <h1 className='lg:text-4xl md:text-4xl text-2xl uppercase text-darkBlack font-bold md:w-[70%] text-center leading-[1.5]'>{singleBlog?.name}</h1>
      <span className='flex place-items-center font-light gap-2 text-xs text-slate-700'>Home <TbMathGreater/> Blog <TbMathGreater/> <span>{path}</span> </span>
      </div>
      
    </div>
  </div>
  )
}
