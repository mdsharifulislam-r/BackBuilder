import React from 'react'
import Container from './Container'
import SideBar from './SideBar'

export default function BlogContainer() {
  return (
    <div className='container flex flex-col md:flex-row place-content-start'>
      <Container/>
      <SideBar/>
    </div>
  )
}
