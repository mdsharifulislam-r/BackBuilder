'use client'
import React, { useEffect, useState } from 'react'
import { GoPlus } from "react-icons/go";
import ProjectCard from './ProjectCard';
import Link from 'next/link';
import { ProjectType } from '@/lib/Types/types';
import { getProjects } from '@/lib/helper/getProjects';
import toast from 'react-hot-toast';
import { useCookies } from 'next-client-cookies';
import { useRouter } from 'next/navigation';
export default function MainContainer() {
  const cookie = useCookies()
  const token = cookie.get('token')
  const router = useRouter()
  useEffect(()=>{
    if(!token){
      router.push('/')
    }
  },[])
  const [projects,setProjects]=useState<ProjectType[]>()
  useEffect(()=>{
    getProjects().then(data=>{
      if(!data.success){
        toast.error(data.message)
      }
      setProjects(data.data)
    })
  },[])
  const data = projects?.map(item=>(
    <ProjectCard project={item} key={item.project_id}/>
  ))
  
  return (
    <div className='md:-mt-28 md:w-[90%] mx-auto group' >
      <div className='grid md:grid-cols-4 grid-cols-1 gap-3'>
        <Link href={"/create-project"} className='w-full md:h-52 md:py-0 py-5 bg-white flex justify-center place-items-center flex-col rounded-md shadow-lg border-[3px] border-orange'>
          <div className='text-6xl group-hover:scale-110 transition-all duration-500 cursor-pointer' >
            <GoPlus/>
            </div> 
            <h1 className='text-xl'>New Project</h1>
        </Link>
       {data}
      </div>
    </div>
  )
}
