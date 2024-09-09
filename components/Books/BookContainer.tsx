import React, { Suspense } from 'react'
import SideBar from '../Courses/SideBar'
import Container from './Container'

export default function BookContainer() {
  return (
    <div className='container flex gap-3'>
        <div className='w-[25%] md:block hidden'>
        <SideBar type='book'/>
   
        </div>
        <Suspense fallback={"loading"}>
        <Container/>
        </Suspense>
      
    </div>
  )
}
