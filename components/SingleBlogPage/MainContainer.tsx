import React from 'react'
import Container from './Container'
import SideBar from '../Blogs/SideBar'

export default function MainContainer() {
  return (
    <div className='container flex gap-4'>
      <Container/>
      <SideBar/>
    </div>
  )
}
