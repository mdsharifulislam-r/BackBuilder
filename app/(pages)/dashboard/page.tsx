
import Header from '@/components/DashBoard/Header/Header'
import DashBoard from '@/components/DashBoard/InstrutorDashBoard/DashBoard'
import EnrollStudents from '@/components/DashBoard/InstrutorDashBoard/EnrollStudents'
import Reviews from '@/components/DashBoard/InstrutorDashBoard/Reviews'
import MainContainer from '@/components/DashBoard/MainContainer/MainContainer'
import SideBar from '@/components/DashBoard/SideBar/SideBar'
import UpdateForm from '@/components/DashBoard/UpdateForm'
import ChooseManu from '@/lib/Helper/ChooseManu'
import React, { Suspense } from 'react'
import { BiMenu } from 'react-icons/bi'
import { HiMenuAlt1 } from "react-icons/hi";
export default function page({searchParams}:{searchParams:{id:string,type:string,text:string}}) {
  const {id,type,text}=searchParams
  
  return (
    <div>
      <Header id={id} type={type}/>
      <div className='px-4 py-4 md:hidden block'>
          <label htmlFor="dash-drawer" className='px-2 py-2 bg-primary text-white rounded-md'>
            Open Menu
          </label>
        </div>
      <div className='container flex gap-4'>
      
        <div className='w-[25%] md:block hidden'>
        <SideBar id={id} type={type}/>
        </div>
        <input type='checkbox' className='peer hidden' id='dash-drawer' />
        <label htmlFor='dash-drawer' className='fixed top-0 left-0 h-full z-[999] w-full bg-black peer-checked:opacity-45 opacity-0 pointer-events-none peer-checked:pointer-events-auto  '></label>

<div className='md:hidden bg-white fixed w-[80%] h-dvh top-0 left-0 z-[1000] overflow-y-scroll scrollbar-thin scrollbar-thumb-primary -translate-x-full peer-checked:translate-x-0 duration-200 sm:translate-x-0'>
  <label htmlFor="dash-drawer" className='absolute top-4 right-4 cursor-pointer'>X</label>
  <SideBar id={id} type={type}/>
</div>
        <MainContainer>
          <Suspense fallback={"loding..."}>
          <ChooseManu id={id} type={type} text={text}/>
          </Suspense>
      
        </MainContainer>
      </div>
      
     </div>
  )
}

