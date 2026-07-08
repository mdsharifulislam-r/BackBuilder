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
    
    
    dispatch(getProjectId(project.project_id))
  }
  return (
    <div onClick={sendProjectId}>
      <Link href={`/projects/${project?.project_id}`} className='w-full md:h-52 bg-white p-6 rounded-2xl border border-line shadow-card hover:shadow-soft hover:-translate-y-0.5 block transition-all duration-300 cursor-pointer relative'>
          <h1 className='text-xl font-semibold text-ink w-full text-nowrap overflow-hidden'>{project.project_name}</h1>
          <span className='text-sm text-muted'>ID: {project?.project_id}</span>
         <div className='absolute bottom-5 left-6 text-xl text-primary hidden md:block'>
            <FaCode/>
         </div>
        </Link>
      </div>
  )
}
