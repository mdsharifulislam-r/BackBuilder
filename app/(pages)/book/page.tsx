import BookContainer from '@/components/Books/BookContainer'
import Header from '@/components/Common/Header'
import React from 'react'

export default function page() {
  return (
    <div className='w-full '>
      <Header path='Books'/>
      <BookContainer/>
    </div>
  )
}
