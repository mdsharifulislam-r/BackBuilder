import Image from 'next/image'
import React from 'react'
import book from '@/assets/book/book.jpg'
import AvarageStar from '../SingleCourseDetails/Reviews/AvarageStar'
import { FaArrowRight } from 'react-icons/fa'
import { getRandomClass } from '@/lib/colors/getRandomColor'
import { Booktype } from '@/lib/Types/Types'
import Link from 'next/link'
import AddCartButton from './AddCartButton'
export default function BookCard({name,description,_id,instructor,price,image,ratings}:Booktype) {
   const bg = getRandomClass()
  return (
    <div className='w-full p-4 bg-white group shadow-lg rounded-md'>
      <Link href={`/book/${_id}`} className={`w-full block md:p-10 p-4 ${bg}  rounded-md relative  cursor-pointer overflow-hidden`}>
        <div className="absolute transition-all duration-500 flex justify-center   w-8 rotate-45 backdrop-blur-lg shadow-white  bg-white -top-16  left-0">
            Sale
        </div>
        <Image src={image} alt='bookImage' width={1000} height={1000} className='drop-shadow-lg max-h-72 md:min-h-72 object-cover'/>
      </Link>
      <div className="textBox py-2">
        <h1 className='md:text-xl text-sm font-semibold drop-shadow'>{name}</h1>
        <span className='text-xs text-slate-500 font-light'>By {instructor.name}</span>
        <div className='flex place-items-center md:text-base text-xs gap-2'>
            <AvarageStar ratings={ratings||[]}/>
           <span className='md:text-xs text-[8px] text-slate-500'> 100% Positive Reviews </span>
        </div>
        <div className='flex pt-2 place-items-center justify-between'>
            <div>
            <span className='md:text-xl text-sm text-primary font-bold'> ${price}</span>
            <span className=' text-slate-400 text-xs line-through font-bold'> $43</span>
            </div>
         <AddCartButton name={name} _id={_id} instructor={instructor} price={price} image={image}/>

        </div>
      </div>
    </div>
  )
}
