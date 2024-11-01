'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import DropDown from './DropDwon'
import { TbArrowRight } from 'react-icons/tb'
import { ProjectType } from '@/lib/Types/types'
import toast from 'react-hot-toast'


export default function Sidebar({page}:{page:string}) {

const [projectsData,setProjectsData]=useState<ProjectType[]>()
useEffect(()=>{
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/sidebarprojects`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            
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
    <div className={`md:w-[25%] transition-all duration-500 ${isShow?"translate-x-0":"-translate-x-full md:translate-x-0"} w-[80%] fixed h-screen bg-indigo-400 p-5 md:relative z-40`}>
        <div className='logo flex justify-center text-white text-2xl font-bold'>
            Backbuilder
        </div>
        <div className="sidebar-menu mt-6">
            <div className="group">
                <div className="title text-slate-200 pb-3">
                    Projects
                </div>
                <div className="items flex flex-col gap-3 max-h-[70vh] overflow-y-scroll">
                {showData}
                </div>
            </div>
        </div>
        <div className=' absolute md:bottom-5 bottom-28 flex justify-center left-0 w-[90%]  '>
            <Link href={`/${page=='database'?'console':"database"}`} className='flex place-items-center gap-4 transition-all duration-500 hover:bg-blue-800 text-slate-200 bg-blue-700 px-5 py-3 rounded-md '>
            <span>Switch to {page=="database"?"Console":"Database"}</span>
            <span><TbArrowRight/></span>
            </Link>
        </div>
    </div>
    <button onClick={()=>setIsShow(prev=>!prev)} className={`fixed top-20 left-0 ${isShow?"hidden":"block"} z-40 bg-blue-600 md:hidden text-white px-1  py-5 text-xl rounded-md shadow-md`}>
        {">"}
    </button>
    <div  onClick={()=>setIsShow(prev=>!prev)} className={`fixed bg-black opacity-35 w-full h-full md:hidden ${isShow?"block":"hidden"} top-0 left-0 cursor-pointer z-20`}>

    </div>
    </>
    
  )
}
