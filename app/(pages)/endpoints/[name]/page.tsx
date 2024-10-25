
import Header from '@/components/singleEndPoint/Header'
import MainContainer from '@/components/singleEndPoint/MainContainer'

import React from 'react'

export default function page({params}:{params:{name:string}}) {
   const {name}=params
  return (
    <div className='w-[75%] bg-blue-50 p-4 h-screen overflow-y-auto'>
      <Header name={name}/>
      <MainContainer name={name}/>
    </div>
  )
}
