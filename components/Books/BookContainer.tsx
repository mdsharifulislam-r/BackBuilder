import React, { Suspense } from 'react'
import SideBar from '../Courses/SideBar'
import Container from './Container'
import { searchObject } from '@/app/(pages)/courses/page'
import { BookFilter } from '@/lib/Helper/bookFilter'

export default function BookContainer({searchData}:{searchData:searchObject}) {
  return (
    <div className='container flex gap-3'>
        <div className='w-[25%] md:block hidden'>
        <SideBar type='book' handle={BookFilter}/>
   
        </div>
        <Suspense fallback={"loading"}>
        <Container searchData={searchData}/>
        </Suspense>
      
    </div>
  )
}
