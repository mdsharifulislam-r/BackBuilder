import { catagories } from '@/components/Courses/SideBar'
import React from 'react'

export default function BlogKeyWords() {
    const arr = catagories?.slice(0,6).map(item=>(
        <button className='px-2 py-2 transition-all duration-500 hover:bg-primary hover:text-white border  rounded-md' key={item}>{item}</button>
    ))
  return (
    <div className='py-3 flex flex-wrap gap-2 '>
     {arr}
    </div>
  )
}
