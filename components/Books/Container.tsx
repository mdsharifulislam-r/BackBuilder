import React from 'react'
import Title from '../Common/Title'
import BookCard from '../BookCard/BookCard'
import { getBooks } from '@/lib/Helper/getBooks'
import { Booktype } from '@/lib/Types/Types'
import { searchObject } from '@/app/(pages)/courses/page'
import filterCourses from '../Hooks/filterCourses'

export default async function Container({searchData}:{searchData:searchObject}) {
  const BookData:Booktype[] = await getBooks()
  const filterBooksData:Booktype[] = filterCourses(searchData,BookData)

  
  const books = filterBooksData?.map(book=>{
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
         <label htmlFor="book-drawer" className='bg-secondary md:hidden text-white cursor-pointer px-3 py-2 rounded-md'>Apply Filter</label>
      <Title heading='Our Books' tagline='Read books and learn more'/>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-3 '>
       {books}
  
      </div>
    </div>
  )
}
