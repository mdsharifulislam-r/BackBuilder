
import Header from '@/components/SingleProjects/Header'
import MainContainer from '@/components/SingleProjects/MainContainer'
import React from 'react'

export default function page({params}:{params:{id:string}}) {
    const {id}=params
  return (
    <div className='md:w-[75%] w-full bg-blue-50 p-4 md:h-screen md:overflow-y-scroll'>
      <Header project_id={parseInt(id)}/>
      <MainContainer/>
    </div>
  )
}
