import Header from '@/components/Console/Header'
import MainContainer from '@/components/Console/MainContainer'
import React from 'react'

export default function page() {
  return (
    <div className='md:w-[75%] w-full'>
      <Header/>
      <MainContainer/>
    </div>
  )
}
