
import React from 'react'
import SidePart from '../Register/SidePart'
import boy from '@/assets/book/boy.webp'
import Form from './form'

export default function BookFormContainer() {
  return (
    <div>
    <div className="container flex w-full gap-4 place-items-center">
      <div className='w-full'>
          <h1 className='text-4xl py-3 font-bold text-primary'>Publish Your  <span className='text-secondary'>own book</span></h1>
          <Form/>
      </div>
      <SidePart image={boy}/>
    </div> 
  </div>
  )
}
