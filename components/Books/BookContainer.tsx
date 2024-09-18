import React, { Suspense } from 'react'
import SideBar from '../Courses/SideBar'
import Container from './Container'
import { searchObject } from '@/app/(pages)/courses/page'
import { BookFilter } from '@/lib/Helper/bookFilter'
import BookCardSkeliton from '../LoadingSection/bookCardSkeliton'

export default function BookContainer({searchData}:{searchData:searchObject}) {
  return (
    <div className='container flex gap-3'>
        <div className='w-[25%] md:block hidden'>
        <SideBar type='book' handle={BookFilter}/>
   
        </div>
      <input type='checkbox' className='peer hidden' id='book-drawer' />

        <label htmlFor='book-drawer' className='fixed top-0 left-0 h-full w-full bg-black peer-checked:opacity-45 opacity-0 pointer-events-none peer-checked:pointer-events-auto z-[9999] '></label>

<div className='md:hidden bg-white fixed w-[80%] h-dvh top-0 left-0 z-[9999] overflow-y-scroll scrollbar-thin scrollbar-thumb-primary -translate-x-full peer-checked:translate-x-0 duration-200 sm:translate-x-0'>
  <label htmlFor="book-drawer" className='absolute top-4 right-4 cursor-pointer'>X</label>
  <SideBar type='book' handle={BookFilter}/>
</div>
        <Suspense fallback={<BookCardSkeliton/>}>
        <Container searchData={searchData}/>
        </Suspense>
      
    </div>
  )
}
