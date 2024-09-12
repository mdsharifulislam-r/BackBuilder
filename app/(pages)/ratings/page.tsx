
import { CourseType } from '@/components/Courses/CourseCard/CourseCard'
import RatingsContainer from '@/components/Ratings/RatingsContainer'
import FeaturedReview from '@/components/SingleCourseDetails/Reviews/FeaturedReview'
import { getCourse } from '@/lib/Helper/getCourse'
import { getSingleBook } from '@/lib/Helper/getSingleBook'
import { getSingleCourse } from '@/lib/Helper/getSingleCourse'
import { getSingleInstructor } from '@/lib/Helper/getSingleInstructor'
import { useAppSelector } from '@/lib/hooks/Hooks'
import { Booktype, InstructorType } from '@/lib/Types/Types'
import React from 'react'

export default async function page({searchParams}:{searchParams:{id:string,sort:string}}) {
    const {id,sort}= searchParams
    const user:InstructorType = await getSingleInstructor(id) 
    const course:CourseType =  await getSingleCourse(id)
    const book:Booktype =  await getSingleBook(id)
    const ratings = user?.ratings ? user?.ratings : course?.ratings
    const finalRatings = ratings || book?.ratings
  return (
    <div>
     <RatingsContainer id={id} ratings={finalRatings||[]} name={user?.name||course?.name} sort={sort}/>
    </div>
  )
}
