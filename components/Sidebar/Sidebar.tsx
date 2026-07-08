'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import DropDown from './DropDwon'
import { TbArrowRight, TbLayoutSidebarLeftExpand } from 'react-icons/tb'
import { ProjectType } from '@/lib/Types/types'
import toast from 'react-hot-toast'


export default function Sidebar({page}:{page:string}) {

const [projectsData,setProjectsData]=useState<ProjectType[]>()
useEffect(()=>{
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/sidebarprojects`)
        .then(res=>res.json())
        .then(data=>{
        

            if(data.success){
                setProjectsData(data.data)
            }else{
                toast.error(data.message)
            }
        })
},[])
const [isShow,setIsShow]=useState(false)
    const showData= projectsData?.map(item=>(
        <DropDown key={item?.project_id} setShow={setIsShow} page={page} content={item}/>
    ))
   
  return (
    <>
    <div className={`md:w-[22%] transition-all duration-500 ${isShow?"translate-x-0":"-translate-x-full md:translate-x-0"} w-[80%] fixed h-screen bg-darkBlack p-5 md:relative z-40 flex flex-col`}>
        <div className='logo flex items-center gap-2 text-white text-xl font-bold px-1'>
            <span className="size-2.5 rounded-full bg-primary" />
            Back<span className="text-primary">Builder</span>
        </div>
        <div className="sidebar-menu mt-8 flex-1 min-h-0">
            <div className="group h-full flex flex-col">
                <div className="title text-xs uppercase tracking-wide text-slate-500 font-semibold pb-3 px-1">
                    Projects
                </div>
                <div className="items flex flex-col gap-2 max-h-[65vh] overflow-y-auto scroll-thin pr-1">
                {showData}
                </div>
            </div>
        </div>
        <div className='pt-5 mt-auto'>
            <Link href={`/${page=='database'?'console':"database"}`} className='flex place-items-center justify-center gap-3 w-full transition-colors duration-300 hover:bg-primary-dark text-slate-100 bg-white/10 px-5 py-3 rounded-lg text-sm font-medium'>
            <span>Switch to {page==="database"?"Console":"Database"}</span>
            <span><TbArrowRight/></span>
            </Link>
        </div>
    </div>
    <button onClick={()=>setIsShow(prev=>!prev)} className={`fixed top-20 left-0 ${isShow?"hidden":"block"} z-40 bg-primary md:hidden text-white px-1 py-5 text-xl rounded-r-md shadow-md`}>
        <TbLayoutSidebarLeftExpand/>
    </button>
    <div  onClick={()=>setIsShow(prev=>!prev)} className={`fixed bg-black/40 w-full h-full md:hidden ${isShow?"block":"hidden"} top-0 left-0 cursor-pointer z-20`}>

    </div>
    </>
    
  )
}
