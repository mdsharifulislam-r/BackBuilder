import React from 'react'
import example from '@/assets/images/exmaples/example.png'
import ecommerce from '@/assets/images/exmaples/ecommerce.png'
import Image from 'next/image'
export default function Expamples() {
  return (
    <div>
        <div className='container'>
        <div className='text-center'>
            <h1 className='md:text-3xl text-xl font-bold text-slate-700'>Some Projects by <span className='text-orange'>BackBuilder</span></h1>
            <p className='text-sm font-extralight mt-2'>These Projects backend has been managed by backbuilder.</p>
        </div>
        <div className='flex flex-col md:flex-row gap-3 mt-10'>
        <div className=''>
        <a href="https://back-builder-to-do-list.vercel.app/">
        <Image className='w-full rounded-lg h-[80%] shadow-lg border object-cover' src={example} alt='example' width={2000} height={2000}/>
        <h1 className='text-xl w-full text-center mt-5 text-slate-500'>A To do List Using BackBuilder</h1>
      </a>
        </div>
        <div className=''>
        <a href="https://shoe-shop-backbuilder.vercel.app/">
        <Image className='w-full rounded-lg h-[80%] shadow-lg border object-cover' src={ecommerce} alt='example' width={2000} height={2000}/>
        <h1 className='text-xl w-full text-center mt-5 text-slate-500'>Shoe Shop Using BackBuilder</h1>
      </a>
        </div>
        </div>
       
    
        </div>
       
    </div>
  )
}
