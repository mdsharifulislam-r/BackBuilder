import Image from 'next/image'
import React from 'react'
import pic from "@/assets/images/console.png"
import OtpBox from './OtpBox'
export default function OtpContainer() {
  return (
    <div className='flex justify-center container'>
      <div className='flex flex-col justify-center md:w-[60%] place-items-center'>
        <div className='w-72'>
        <Image src={pic} alt='' width={1000} height={1000}/>
        </div>
        <h1 className='text-4xl font-bold text-blue-600'>Verification</h1>
        <span className='text-sm md:w-[350px] font-extralight text-slate-600 pt-3 text-center'>Verification code has been sent your email address. Take otp an verify your account.</span>
        <OtpBox/>

      </div>
   
    </div>
  )
}
