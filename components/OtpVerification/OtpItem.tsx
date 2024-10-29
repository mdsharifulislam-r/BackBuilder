'use client'
import React, { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react'

function OtpItem(props:DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  return (
    <div>
    <input type="text" {...props} className='md:w-28 w-14  md:h-28 h-14 focus:outline-none focus:shadow-xl invalid:bg-primary invalid:text-white transition-all duration-500 text-4xl text-center border rounded-md bg-dark'  />
    </div>
  )
}
export default forwardRef(OtpItem)
