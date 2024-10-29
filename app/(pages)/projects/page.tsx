
import Header from '@/components/SingleProjects/Header'
import MainContainer from '@/components/SingleProjects/MainContainer'
import React from 'react'

export default function page() {
   
  return (
    <div className='w-[75%] bg-blue-50 p-4 md:h-screen md:overflow-y-auto'>
      <Header project_id={0}/>
      <MainContainer/>
    </div>
  )
}
