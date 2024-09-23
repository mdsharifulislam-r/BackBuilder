
import React from 'react'
import Header from './Header'
import MainContainer from '@/components/SingleBlogPage/MainContainer'


export default function page({params}:{params:{id:string}}) {
  const {id} = params
  return (
    <div>
    <Header path={id}/>
<MainContainer id={id}/>
    </div>
  )
}
