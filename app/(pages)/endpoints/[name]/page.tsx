
import Header from '@/components/singleEndPoint/Header'
import MainContainer from '@/components/singleEndPoint/MainContainer'

import React from 'react'

export default function page({params}:{params:{name:string}}) {
   const {name}=params
  return (
    <div className='md:w-[75%] w-full bg-blue-50 p-4 md:h-screen md:overflow-y-auto'>
      <Header name={name}/>
      <MainContainer name={name}/>
    </div>
  )
}
