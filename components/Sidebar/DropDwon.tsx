'use client'
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hooks'
import { getEndPointId, getProjectId } from '@/lib/Store/features/CartSlice'
import { ProjectType } from '@/lib/Types/types'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { TbArrowBadgeRight, TbDashboard } from 'react-icons/tb'

export default function DropDown({content}:{content:ProjectType}) {
    const project_id = useAppSelector(state=>state.cartReduicer.project_id)
    
    const [expand,setExpand]=useState(content?.project_id==project_id?true:false)
    const dispatch = useAppDispatch()
    const router = useRouter()
  return (
    <div className='w-full rounded-md p-2 bg-blue-700 cursor-pointer ' onClick={()=>{
        
    }} >
    <div className='flex place-items-center justify-between' onClick={()=>{setExpand(prev=>!prev)
        dispatch(getProjectId(content.project_id))
        router.push( `/projects/${content?.project_id}`)
    }}>
    <div className='flex place-items-center gap-3'>
    <div className="idon text-2xl text-slate-200">
        <TbDashboard/>
    </div>
    <div className="title text-slate-200 ">
        {content?.project_name}
    </div>
    </div>
    <div className={`text-white ${expand?"rotate-90":"rotate-0"} transition-all duration-500`}>
        <TbArrowBadgeRight/>
    </div>
    </div>
    <div className={`endpoints ml-8 flex flex-col gap-2 ${expand?"h-auto pt-3":"h-0"} overflow-hidden transition-all duration-500`}>
       {
        content?.endpoints?.map(item=>(
            <Link onClick={()=>dispatch(getEndPointId(item.primary_id))} key={item.primary_id} href={`/endpoints/${item?.name}`} className="endpoint text-slate-300 transition-all duration-500 hover:text-white flex place-items-center gap-1 hover:gap-2">
            <span>/</span><span>{item.name}</span>
            </Link>
        ))
       }
       
    </div>
  
</div>
  )
}
