import React from 'react'
import ReviewForm from './ReviewForm'
import { getSingleBook } from '@/lib/Helper/getSingleBook'
import { Booktype } from '@/lib/Types/Types'
import FeaturedReview from '../SingleCourseDetails/Reviews/FeaturedReview'

export default async function Ratings({id}:{id:string}) {
  const book:Booktype = await getSingleBook(id)
  const ratings = book?.ratings

  return (
    <div>
     {ratings?.length ? <FeaturedReview id={id} reviews={ratings||[]}/>:""}
      <ReviewForm id={id}/>
    </div>
  )
}
