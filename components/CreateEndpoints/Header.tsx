import Image from 'next/image'
import React from 'react'
import pic from "@/assets/images/console.png"
import EndForm from './EndForm'
export default function Header() {
  return (
    <div className='w-full bg-white isolate'>
      <div className="container flex relative ">
        <div className="absolute bg-blue-50 -z-10  w-full h-1/2 top-0 left-0">

        </div>
        <div className="textBox md:w-1/2">
        <h1 className='text-3xl text-blue-600 font-bold'>Create a <span className='text-orange'>Endpoints</span></h1>
        <p className='text-sm font-extralight text-slate-600 pt-2'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo eos dolore debitis inventore corrupti ea quaerat, nisi alias commodi ducimus.</p>
        <EndForm/>
        </div>
        <div className="imageBox w-1/2 md:block hidden">
            <Image src={pic} alt='image'/>
        </div>
      </div>
    </div>
  )
}
