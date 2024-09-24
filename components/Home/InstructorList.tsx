import React from 'react'
import Title from '../Common/Title'
import Image, { StaticImageData } from 'next/image'
import teacher1 from "@/assets/Home/Teacher/teacher1.webp"
import teacher2 from "@/assets/Home/Teacher/teacher3.webp"
import teacher3 from "@/assets/Home/Teacher/teacher2.webp"
import { FaFacebook, FaFacebookF, FaInstagram, FaTwitch, FaTwitter } from 'react-icons/fa'
import { randomUUID } from 'crypto'
import Link from 'next/link'
interface cardprops{
    image:StaticImageData | string,
    name:string,
    title:string,
    desc?:string,
    id?:string
}
export function InstructorCard({image,name,title,desc,id}:cardprops){
    return (
    <div data-aos="zoom-in-up" className='flex justify-center group lg:max-w-full place-items-center flex-col gap-4'>
        <div  className="imageBox  w-full flex justify-center translate-y-24">
            <div className="div w-[80%] min-h-64 rounded-xl overflow-hidden relative ">
                <div className="sade opacity-0 absolute w-full h-full top-0 left-0 bg-primary transition-all duration-500 z-20 group-hover:opacity-50 ">
                 
                </div>
                <div className="sade absolute flex justify-center place-items-center w-full h-full top-0 left-0 z-30  ">
                    <div className="con flex place-items-center gap-5">
                        <a className='p-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-0  border border-white cursor-pointer hover:bg-white hover:text-primary translate-y-16 delay-100 transition-all duration-500 rounded-full text-xl text-white'><FaFacebookF/></a>
                        <a className='p-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-0  border border-white cursor-pointer hover:bg-white hover:text-primary translate-y-16 delay-300 transition-all duration-500 rounded-full text-xl text-white'><FaInstagram/></a>
                        <a className='p-3  opacity-0 group-hover:opacity-100 group-hover:translate-y-0 border border-white cursor-pointer hover:bg-white hover:text-primary translate-y-16 delay-500 transition-all duration-500 rounded-full text-xl text-white'><FaTwitter/></a>
                    </div>
                </div>
                <Image src={image} className='absolute w-full h-full object-cover left-0 top-0' width={500} height={500} alt='teacher image'/>
            </div>
        </div>
        <Link href={`/instructors/${id}`} className="textBox w-full h-full flex flex-col rounded-xl shadow-2xl p-6 pt-24 justify-center place-items-center ">
            <h1 className='text-2xl text-darkBlack'>{name}</h1>
            <p className='text-slate-500 py-3 font-extralight'>{title}</p>
            <span className='text-center text-sm px-4 text-slate-500 line-clamp-2'>{desc}</span>
        </Link>
    </div>
    )
}

export default function InstructorList() {

  return (
    <div>
      <div className="container">
        
        <Title tagline='Instructions' heading='Our Instructors'/>
        <div className="cont flex -translate-y-10 flex-col md:flex-row lg:flex-row justify-center place-items-center lg:gap-8 md:gap-5 gap-3">
            <InstructorCard
            key={Date.now()}
            image={teacher1}
            name='Mr Jhon'
            title='Web Devloper'
            desc='Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam magni tempora doloremque?'
            />
            <InstructorCard
            key={Date.now()}
            image={teacher2}
            name='Mrs Juila'
            title='Graphics Designer'
            desc='Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam magni tempora doloremque?'
            />
            <InstructorCard
            key={Date.now()}
            image={teacher3}
            name='Mr Fetric'
            title='Digital Marketor'
            desc='Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam magni tempora doloremque?'
            />
        </div>
      </div>
    </div>
  )
}
