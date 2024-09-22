
import React, { InputHTMLAttributes } from 'react'

interface data{
    icon:any,
    message?:string
}
type main = InputHTMLAttributes<HTMLInputElement> & data
export default function InputBox(data:main) {

  return (
    <>
    <div className='flex place-items-center  my-1 px-3 rounded-md py-1 border border-primary w-full gap-2 shadow transition-all duration-500 '>
      <div className='text-primary'>
{data.icon}
      </div>
      <input className='focus:outline-none flex-grow py-2 focus:placeholder:text-black transition-all duration-300 text-sm translate-y-[1px]' {...data} />
     
    </div>
    <span className='text-[10px] text-red-400'>{data.message}</span>
    </>
  )
}
