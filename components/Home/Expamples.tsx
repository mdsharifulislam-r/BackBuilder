import React from 'react'
import example from '@/assets/images/exmaples/example.png'
import Image from 'next/image'
export default function Expamples() {
  return (
    <div>
        <div className='container'>
        <div className='text-center'>
            <h1 className='md:text-3xl text-xl font-bold text-slate-700'>A Todo List by <span className='text-orange'>BackBuilder</span></h1>
            <p className='text-sm font-extralight mt-2'>This todolist backend is manage by backbuilder.</p>
        </div>
        <div className='mt-10'>
        <a href="https://back-builder-to-do-list.vercel.app/">
        <Image className='w-full rounded-lg h-[80%] shadow-lg border' src={example} alt='example' width={2000} height={2000}/>
      </a>
        </div>
    
        </div>
       
    </div>
  )
}
