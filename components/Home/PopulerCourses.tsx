import React from 'react'
import Title from '../Common/Title'
import course1 from "@/assets/Home/PopulerCourse/course1.webp"
import course2 from "@/assets/Home/PopulerCourse/course3.webp"
import course3 from "@/assets/Home/PopulerCourse/course2.webp"
import course4 from "@/assets/Home/PopulerCourse/course4.webp"
import Image, { StaticImageData } from 'next/image'
import { FaBook, FaClock, FaStar, FaStarHalf, FaUser } from 'react-icons/fa'
import { randomUUID } from 'crypto'
interface courseCardProps{
  image:StaticImageData | string,
  name:string,
  star:number,
  price:number

}

export function CourseCard({image,name,star,price}:courseCardProps){
  const startArr = star.toString().includes(".") ? new Array(Math.floor(star)).fill(<FaStar key={Date.now()}/>):new Array(star).fill(<FaStar k1={Date.now()}/>)
    return (
        <div className='flex gap-4 place-items-start  lg:p-9 md:p-5 p-2 bg-white rounded-md group hover:bg-primary transition-all duration-500'>
            <div className="imageBox w-[80%] h-full relative min-h-40 rounded-md overflow-hidden">
              <div className="lessen z-10 bg-orange absolute p-2 md:text-sm text-[10px] rounded-lg text-white gap-2 top-3 left-3 flex place-items-center">
                <FaClock/> 12 Weeks
              </div>
                <Image src={image} className='z-0 absolute w-full h-full object-cover top-0 left-0' width={500} height={500} alt='courseImage'/>
            </div>
            <div className="textBox w-[120%] pb-10 group-hover:text-white">
                <h2 className='text-xl font-bold text-secondary group-hover:text-white'>${price}</h2>
                <h1 className='md:text-xl text-base text-darkBlack font-medium group-hover:text-white'>{name}.</h1>
                <div className="start flex place-items-center gap-2 py-2">
                  <div className="star flex place-items-center group-hover:text-white text-sm text-orange">
                    {startArr} {star.toString().includes(".") && <FaStarHalf/>}
                  </div>
                  <div className="rating">
                  ({star}/ 2 Ratings)
                  </div>
                </div>
                <div className="lesson pt-5 group-hover:text-white flex place-items-center gap-3 md:text-sm text-[10px] text-slate-500">
                  <div className="lesson flex place-items-center gap-3">
                    <FaBook/> 8 Lessons |
                  </div>
                  <div className=' flex place-items-center gap-3'>
                    <FaUser/> 72 students
                  </div>

                </div>
            </div>
        </div>
    )
}
export default function PopulerCourses() {
  return (
    <div className='w-full bg-dark'>
      <div className="container">
        <Title tagline='Our Populer Cources' heading='Pick A Course To Get Started'/>
        <div className="con py-8 w-full grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5">
            <CourseCard
            image={course2}
            name='Think in a Madical Way'
            star={3.5}
            price={45}
            />
            <CourseCard
            image={course1}
            name='Think in a Management'
            star={4.5}
            price={20}
            />
            <CourseCard
            image={course3}
            name='Think in a Redux Way'
            star={5}
            price={20}
            />
            <CourseCard
            image={course4}
            name='Think in a Fitness way'
            star={4.5}
            price={30}
            />
        </div>
        <div className="button flex justify-center">
          <button className='btn bg-primary text-white'>Expolre More Course</button>
        </div>
      </div>
    </div>
  )
}
