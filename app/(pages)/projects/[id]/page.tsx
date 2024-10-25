
import Header from '@/components/SingleProjects/Header'
import MainContainer from '@/components/SingleProjects/MainContainer'
import React from 'react'

export default function page({params}:{params:{id:string}}) {
    const {id}=params
  return (
    <div className='w-[75%] bg-blue-50 p-4 h-screen overflow-y-scroll'>
      <Header project_id={parseInt(id)}/>
      <MainContainer/>
    </div>
  )
}
