import { catagories } from '@/components/Courses/SideBar'
import React from 'react'
function LinkData({name}:{name:string}){
    return (
        <div className='py-1'>
        <div className='flex justify-between font-light '>
            <span>{name}</span>
            <span>(5)</span>
        </div>
    </div>
    )
}
export default function Catagories() {
    const arr = catagories?.slice(0,5).map(item=>(
        <LinkData name={item} key={item}/>
    ))
  return (
    <div className='pt-10'>
        <h1 className='text-xl font-light pb-3'>Catagories</h1>
       {arr}
    </div>
  )
}
