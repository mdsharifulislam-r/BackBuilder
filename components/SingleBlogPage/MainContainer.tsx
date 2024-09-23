import React from 'react'
import Container from './Container'
import SideBar from '../Blogs/SideBar'

export default function MainContainer({id}:{id:string}) {
  return (
    <div className='container flex md:flex-row flex-col gap-4'>
      <Container id={id}/>
      <SideBar/>
    </div>
  )
}
