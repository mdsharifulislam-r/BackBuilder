
import Header from '@/components/SingleDatabase/Header'
import MainContainer from '@/components/SingleDatabase/MainContainer'
import React from 'react'

export default function page({params}:{params:{name:string}}) {
    const {name}=params
  return (
    <div className='p-4 w-full mx-auto h-screen overflow-y-scroll pb-32 scrollbar-none'>
        <Header name={name}/>
      <MainContainer name={name}/>
    </div>
  )
}
