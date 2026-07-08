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
    <div className='md:-mt-20 md:w-[92%] mx-auto group' >
      <div className='grid md:grid-cols-4 grid-cols-1 gap-4'>
        <Link href={"/create-project"} className='w-full md:h-52 md:py-0 py-8 bg-white flex justify-center place-items-center flex-col rounded-2xl shadow-card border-2 border-dashed border-primary/40 hover:border-primary transition-colors'>
          <div className='text-5xl text-primary group-hover:scale-110 transition-all duration-500 cursor-pointer' >
            <GoPlus/>
            </div> 
            <h1 className='text-lg font-medium text-ink mt-2'>New Project</h1>
        </Link>
       {data}
      </div>
    </div>
  )
}
