import React from 'react'
import { IoIosSearch } from "react-icons/io";
export default function SearchBar() {
  return (
    <div className='border border-primary rounded-md w-full  flex place-items-center'>
        <div className='p-2'>
        <input type="text" placeholder='Search...' className='px-4 w-[60%] focus:outline-none ' />
        </div>
   
      <button className='px-4 bg-primary text-white  text-2xl relative h-10'><IoIosSearch/></button>
    </div>
  )
}
