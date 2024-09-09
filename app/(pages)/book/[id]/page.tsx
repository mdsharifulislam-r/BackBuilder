import Header from '@/components/Common/Header'
import SingleBookContainer from '@/components/SingleBookPage/SingleBookContainer'
import React from 'react'

export default function page({params}:{params:{id:string}}) {

  return (
    <div>
    <Header path='Single Product'/>
    <SingleBookContainer id={params.id} />
    </div>
  )
}
