import Image from 'next/image'
import React from 'react'
import book from '@/assets/book/book.jpg'
import AvarageStar from '../SingleCourseDetails/Reviews/AvarageStar'
import { FaArrowRight } from 'react-icons/fa'
import { getRandomClass } from '@/lib/colors/getRandomColor'
import { Booktype } from '@/lib/Types/Types'
import Link from 'next/link'
export default function BookCard({name,description,_id,instructor,price,image}:Booktype) {
   const bg = getRandomClass()
  return (
    <div className='w-full p-4 bg-white group shadow-lg rounded-md'>
      <Link href={`/book/${_id}`} className={`w-full block md:p-10 p-4 ${bg}  rounded-md relative  cursor-pointer overflow-hidden`}>
        <div className="absolute transition-all duration-500 flex justify-center   w-8 rotate-45 backdrop-blur-lg shadow-white  bg-white -top-16  left-0">
            Sale
        </div>
        <Image src={image} alt='bookImage' width={1000} height={1000} className='drop-shadow-lg max-h-72 min-h-72 object-cover'/>
      </Link>
      <div className="textBox py-2">
        <h1 className='text-xl font-semibold drop-shadow'>{name}</h1>
        <span className='text-xs text-slate-500 font-light'>By {instructor.name}</span>
        <div className='flex place-items-center md:text-base text-xs gap-2'>
            <AvarageStar ratings={[{user:"",star:"4",desc:""}]}/>
           <span className='md:text-xs text-[8px] text-slate-500'> 100% Positive Reviews </span>
        </div>
        <div className='flex pt-2 place-items-center justify-between'>
            <div>
            <span className='text-xl text-primary font-bold'> ${price}</span>
            <span className=' text-slate-400 text-sm line-through font-bold'> $43</span>
            </div>
            <div>
                <button className='md:px-4 px-2 md:py-2 py-1 text-[10px] rounded-md transition-all duration-300 hover:bg-primary bg-secondary text-white md:text-xs font-bold flex place-items-center gap-1'>Add to Cart <FaArrowRight/> </button>
            </div>

        </div>
      </div>
    </div>
  )
}
