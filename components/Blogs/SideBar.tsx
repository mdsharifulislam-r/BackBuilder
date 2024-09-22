import React from 'react'
import { FaSearch } from 'react-icons/fa'
import LatestPost from './SideBar/LatestPost'
import Catagories from './SideBar/Catagories'
import Ad from './SideBar/Ad'
import BlogKeyWords from './SideBar/BlogKeyWords'
import PostButton from './SideBar/postButton'

export default function SideBar() {
  return (
    <div className='md:w-[30%] w-full shadow-xl p-10 rounded-md'>
     <PostButton/>
      <div className="search pt-2">
        <h3 className="text-xl font-light pb-3">Search</h3>
        <div className='flex place-items-center w-full gap-2 py-3 rounded-md border px-3'>
            <span className='text-slate-500 font-thin'><FaSearch/></span>
            <input type="text" placeholder='Search' className='focus:outline-none' />
        </div>
      </div>
      <LatestPost/>
      <Catagories/>
      <div className='pt-4'>
      <Ad/>
      </div>
      <BlogKeyWords/>
  
    </div>
  )
}
