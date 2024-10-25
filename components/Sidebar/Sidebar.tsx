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
    const showData= projectsData?.map(item=>(
        <DropDown content={item}/>
    ))
    
  return (
    <div className='w-[25%] h-screen bg-indigo-400 p-5 relative'>
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
        <div className=' absolute bottom-5 flex justify-center left-0 w-[90%]  '>
            <Link href={`/${page=='database'?'console':"database"}`} className='flex place-items-center gap-4 transition-all duration-500 hover:bg-blue-800 text-slate-200 bg-blue-700 px-5 py-3 rounded-md '>
            <span>Switch to {page=="database"?"Console":"Database"}</span>
            <span><TbArrowRight/></span>
            </Link>
        </div>
    </div>
  )
}
