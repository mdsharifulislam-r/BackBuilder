
import DataNotFound from '@/components/Common/DataNotFound/DataNotFound'
import Title from '@/components/Common/Title'
import CourseCard, { CourseType } from '@/components/Courses/CourseCard/CourseCard'
import { getSingleCourse } from '@/lib/Helper/getSingleCourse'
import { getStudentInfo } from '@/lib/Helper/getStudent'
import { Student } from '@/lib/Types/Types'
import React from 'react'

export default async function Courses({id}:{id:string}) {
    const student:Student = await getStudentInfo(['courseCollections',"completeVideos"],id)
    const courseCollections = student?.courseCollections
    const CourseData = courseCollections?.map( async id=>{
        const course:CourseType = await getSingleCourse(id)
        return  <CourseCard
        key={course._id}
        _id={course._id}
        name={course.name}
        instructor={course.instructor}
        duration={course.duration}
        image={course.image}
        desc={course.desc}
        rate={course.rate}
        type={course.type}
        level={course.level}
        price={course.price}
        promocodes={course.promocodes}
        ratings={course?.ratings}
        stdentCompleteVideos={student?.completeVideos}
        progress={true}
        module={course?.module}
      />
    })
  return (
    <div className=''>
     {CourseData?.length ? <Title heading='My Courses' tagline='Achive your dream'/>:""}
     {CourseData?.length ? <div className='grid md:grid-cols-2 gap-2 grid-cols-1 py-5'>
      {CourseData}
    </div>:<DataNotFound title='You are not enroll eny course yet'
    link='/courses'
    LinkText='Enroll Now'
    />}
    </div>
 
  )
}
