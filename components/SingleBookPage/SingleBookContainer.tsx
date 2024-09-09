import React from 'react'
import ImageBox from './ImageBox'
import TextContainer from './TextContainer'
import { getSingleBook } from '@/lib/Helper/getSingleBook'
import { Booktype } from '@/lib/Types/Types'
import Ratings from './Ratings'

export default async function SingleBookContainer({id}:{id:string}) {
  const book:Booktype = await getSingleBook(id)


  return (
    <div className='container '>
      <div className='justify-center flex md:flex-row flex-col gap-6 md:px-24 py-10'>
      <ImageBox image={book?.image}/>
      <TextContainer book={book}/>
      
      </div>
      <Ratings/>
    </div>
  )
}
