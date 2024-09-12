'use client'
import { getStudentInfoClient } from '@/lib/Helper/GetStudentInfoClient';
import { useAppSelector } from '@/lib/hooks/Hooks';
import { Student } from '@/lib/Types/Types';
import React, { useEffect, useState } from 'react'
import { IoDiamondSharp } from "react-icons/io5";
let updateDiamond = false

export const setUpdateDiamon = () =>{
  updateDiamond = !updateDiamond
}
export default function Diamond({id}:{id:string}) {
const [diamond,setUser]=useState<Student | null>(null)

useEffect(()=>{
  getStudentInfoClient(["diamond"],id).then(res=>setUser(res))
  
},[updateDiamond])

 
  return (
    <div className='flex text-sm place-items-center gap-2 px-2 py-1 text-white cursor-pointer bg-primary rounded-full'>
      <span><IoDiamondSharp/></span>
      <span>{diamond?.diamond || 0}</span>
    </div>
  )
}
