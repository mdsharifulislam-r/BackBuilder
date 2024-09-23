import React, { Suspense } from 'react'
import Container from './Container'
import SideBar from './SideBar'
import Loading from '../LoadingSection/Loading'
import BlogCardSkeliton from '../LoadingSection/blogCardSkeliton'

export default function BlogContainer() {
  return (
    <div className='container flex flex-col md:flex-row place-content-start'>
      <Suspense fallback={<BlogCardSkeliton/>}>
      <Container/>
      <SideBar/>
      </Suspense>
      
    </div>
  )
}
