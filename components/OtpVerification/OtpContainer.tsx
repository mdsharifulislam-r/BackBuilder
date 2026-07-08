import Image from 'next/image'
import React from 'react'
import pic from "@/assets/images/console.png"
import OtpBox from './OtpBox'
export default function OtpContainer() {
  return (
    <div className='min-h-[calc(100vh-64px)] flex justify-center items-center bg-slate-50 px-4 py-10'>
      <div className='flex flex-col items-center md:w-[420px] w-full bg-white border border-line rounded-2xl shadow-card p-8'>
        <div className='w-40'>
          <Image src={pic} alt='' width={1000} height={1000} />
        </div>
        <h1 className='text-3xl font-bold text-ink'>Verification</h1>
        <p className='text-sm text-muted pt-2 text-center'>
          We&apos;ve sent a verification code to your email address. Enter it below to verify your account.
        </p>
        <div className="mt-6 w-full">
          <OtpBox />
        </div>
      </div>
    </div>
  )
}
