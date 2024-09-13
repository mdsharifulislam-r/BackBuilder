import Container from '@/components/Lessons/Container'
import SideBar from '@/components/Lessons/SideBar'
import React, { Suspense } from 'react'
export const dynamic = "force-dynamic"
export default function page({params}:any) {
  const {lesson}:{lesson:string}=params
  const [courseId,moduleId,videoId]=lesson?.split("%2B")
 
  
  return (
    <div className='w-full min-h-screen flex lg:flex-row flex-col-reverse gap-3 py-3'>
      <Suspense fallback={'loading...'}>
      <SideBar courseId={courseId} moduleId={moduleId} videoId={videoId}/>
      <Container courseId={courseId} moduleId={moduleId} videoId={videoId} />
      </Suspense>
     
    </div>
  )
}
