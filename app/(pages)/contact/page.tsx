import Image from 'next/image'
import React from 'react'
import pic from '@/assets/images/hero.gif'
export default function page() {
  return (
    <div>
      <div className="container flex place-items-center justify-center md:flex-row flex-col-reverse">
        <div className="text-box md:w-1/2 px-2">
        <h1 className='text-4xl text-blue-600 font-bold'>CONTACT <span className='text-orange'>US</span></h1>
        <form action="">
            <input type="text" name="" id="" placeholder='Full Name' className='pt-6 px-3 pb-1 w-full border-b focus:outline-none' />
            <input type="text" name="" id="" placeholder='Email Address' className='pt-6 px-3 pb-1 w-full border-b focus:outline-none' />
            <input type="text" name="" id="" placeholder='Phone Number' className='pt-6 px-3 pb-1 w-full border-b focus:outline-none' />
            <textarea name="" id="" className='w-full min-h-20 p-3 mt-2 border-b focus:outline-none' placeholder='Message Here'></textarea>
            <button className='px-4 md:w-fit w-full py-1 bg-blue-600 text-white rounded-md mt-2'>Send Email</button>
        </form>
        </div>
        <div className="image-box md:w-1/2">
        <Image src={pic} alt='image' width={1000} height={1000}/>
        </div>
      </div>
    </div>
  )
}
