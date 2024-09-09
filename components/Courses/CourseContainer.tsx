import React, { Suspense } from 'react'
import SideBar from './SideBar'
import Container from './Container'
import { searchObject } from '@/app/(pages)/courses/page'

export default function CourseContainer({searchData,active}:{searchData:searchObject,active:string}) {

  
  return (
    <div className='w-full flex gap-4 min-h-screen'>
      <div className='w-[25%] hidden lg:block md:block'>
      <SideBar/>
      </div>
      <Suspense fallback={"...Loading"}>
      <Container active={active} searchData={searchData}/>
      </Suspense>
    
    </div>
  )
}
