import Header from '@/components/Console/Header'
import MainContainer from '@/components/Console/MainContainer'
import React from 'react'

export default function page() {
  return (
    
    <div className='bg-blue-50 w-full p-5 '>
      <div className="container">
      <Header/>
      <MainContainer/>
      </div>
     
    </div>
  )
}
