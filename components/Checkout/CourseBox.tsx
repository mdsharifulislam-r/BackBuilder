import { cartItem } from '@/lib/Store/features/CartSlice'
import Image from 'next/image'
import React from 'react'

export default function CourseBox({item}:{item:cartItem}) {
  return (
    <div className="details flex justify-between place-items-center pb-4 border-b ">
    <div className='flex place-items-center gap-5  '>
    <Image src={item.image} alt='' width={200} className='w-24 h-16 object-cover' height={200} />
    <h1 className='font-bold'>{item.name}</h1>
    </div>
 
    <div className="price text-slate-500 capitalize">{item.price !== "free" ? `${item.price}x${item.amount||1}`:item.price}</div>
</div>
  )
}
