import React from 'react'
import { Item } from './CourseCardSkeliton'

export default function BlogCardSkeliton() {
    const data = new Array(9).fill(<Item key={Math.random()}/>)
  return (
    <div className='flex gap-3 md:flex-row flex-col w-full'>
      <div className="grid flex-grow md:grid-cols-2 gap-2 px-2">
        {data}
      </div>
      <div className="w-[30%] h-dvh skeleton rounded-md shadow-md"></div>
    </div>
  )
}
