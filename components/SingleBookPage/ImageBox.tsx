import { getRandomClass } from '@/lib/colors/getRandomColor'
import Image from 'next/image'
import book from "@/assets/book/book.jpg"
import React from 'react'

export default function ImageBox({image}:{image:string}) {
    const color = getRandomClass()
  return (
    <div className={`w-full ${color} h-full rounded-xl flex justify-center py-16 place-items-center`}>
      <Image src={image||book} alt='' width={1000} height={1000} className='h-[70%] max-h-[600px] drop-shadow-2xl object-cover w-[60%]'/>
    </div>
  )
}
