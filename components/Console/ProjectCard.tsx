'use client'
import { getProjectId } from '@/lib/Store/features/CartSlice';
import { ProjectType } from '@/lib/Types/types';
import Link from 'next/link';
import React from 'react'
import { FaCode } from "react-icons/fa";
import { useDispatch } from 'react-redux';
export default function ProjectCard({project}:{project:ProjectType}) {
  const dispatch = useDispatch()
  const sendProjectId=()=>{
    console.log('called');
    
    dispatch(getProjectId(project.project_id))
  }
  return (
    <div onClick={sendProjectId}>
      <Link href={`/projects/${project?.project_id}`} className='w-full h-52 bg-white p-5 rounded-md shadow-lg hover:scale-105 block transition-all duration-500 cursor-pointer relative text-wrap '>
          <h1 className='text-2xl text-slate-600  w-full text-nowrap overflow-hidden'>{project.project_name}</h1>
          <span className='text-slate-500'>{project?.project_id}</span>
         <div className='absolute bottom-5 left-5 text-2xl'>
            <FaCode/>
         </div>
        </Link>
      </div>
  )
}
