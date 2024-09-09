import React from 'react'
import Title from '../Common/Title'
import BookCard from '../BookCard/BookCard'
import { getBooks } from '@/lib/Helper/getBooks'
import { Booktype } from '@/lib/Types/Types'

export default async function Container() {
  const BookData:Booktype[] = await getBooks()
  const books = BookData?.map(book=>{
    return <BookCard
    _id={book._id}
    name={book.name}
    image={book.image}
    description={book.description}
    instructor={book.instructor}
    price={book.price}
    publishDate={book.publishDate}
    type={book.type}
    level={book.level}
    key={book._id}
    />
  })
  return (
    <div className='md:w-[75%]'>
      <Title heading='Our Books' tagline='Read books and learn more'/>
      <div className='grid lg:grid-cols-3 grid-cols-2 gap-3 '>
       {books}
  
      </div>
    </div>
  )
}
