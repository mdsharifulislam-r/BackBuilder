
import Header from '@/components/SingleProjects/Header'
import MainContainer from '@/components/SingleProjects/MainContainer'
import React from 'react'

export default function page() {
   
  return (
    <div className='w-[75%] bg-blue-50 p-4 h-screen overflow-y-auto'>
      <Header/>
      <MainContainer/>
    </div>
  )
}
