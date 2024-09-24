import React from 'react'
interface props{
    tagline?:string,
    heading?:string
}
export default function Title({tagline,heading}:props) {
  return (
    <div className="four py-2 flex justify-center flex-col place-items-center">
        <span className=' lg:text-xl md:text-lg text-base font-thin' data-aos="fade-right">
            {tagline}
        </span>
  <h1 data-aos="fade-left" className='lg:text-4xl md:text-3xl text-2xl text-primary font-bold flex flex-col justify-center'>{heading}
  <span className='w-1/2 bg-secondary p-[1px] rounded-xl'></span>
  </h1>

  
</div>
  )
}
