
import React from 'react'
import Header from './Header'
import MainContainer from '@/components/SingleBlogPage/MainContainer'


export default function page({params}:{params:string}) {
  return (
    <div>
   <Header path='One night Stand'/>
<MainContainer/>
    </div>
  )
}
