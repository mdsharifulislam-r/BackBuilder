"use client"

import Container from '@/components/Lessons/Container'
import SideBar from '@/components/Lessons/SideBar'
import Loading from '@/components/LoadingSection/Loading'
import { useAppSelector } from '@/lib/hooks/Hooks'
import { useRouter } from 'next/navigation'
import React, { Suspense } from 'react'

export default function page() {

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
