"use client"
import React, { Suspense } from 'react'
import SideBar from './SideBar'
import Container from './Container'
import Loading from '../LoadingSection/Loading'
import { useAppSelector } from '@/lib/hooks/Hooks'

export default function MainContainer() {
    const moduleData = useAppSelector(state=>state.userReduicer.moduleData)
  return (
    <div className='w-full min-h-screen flex lg:flex-row flex-col-reverse gap-3 py-3'>
    <Suspense fallback={"loading"}>
    <SideBar courseId={moduleData?.courseId} moduleId={moduleData?.moduleId} videoId={moduleData?.videoId}/>
    </Suspense>
    <Suspense fallback={<Loading/>}>
   
    <Container courseId={moduleData?.courseId} moduleId={moduleData?.moduleId} videoId={moduleData?.videoId} />
    </Suspense>
    
  </div>
  )
}
