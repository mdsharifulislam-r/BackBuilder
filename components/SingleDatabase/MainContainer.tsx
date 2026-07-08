'use client'
import React, { useEffect, useState } from 'react'
import HeaderRow from './SchmaTable'
import TableRow from './TableRow'
import TableBody from './TableBody'
import { useAppSelector } from '@/lib/hooks/hooks'
import { useCookies } from 'next-client-cookies'
import JWT from "jwt-simple"
import Image from 'next/image'
import pic from '@/assets/images/nodata.gif'
import { useRouter } from 'next/navigation'

export default function MainContainer({name}:{name:string}) {
  const project_id = useAppSelector(state=>state.cartReduicer.project_id)
  const cookie = useCookies()
  const token = cookie.get('token')
  const router = useRouter()
  useEffect(()=>{
    if(!token){
      router.push('/')
      
    }
  },[token])

  const user_id = JWT.decode(token||"",process.env.NEXT_PUBLIC_JWT_SECRET!)
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/user/${user_id}/${project_id}/${name}`
 
  const change = useAppSelector(state=>state.cartReduicer.dataChange)
  
  const [data,setData]=useState<any[]>([])
  useEffect(()=>{
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/${user_id}/${project_id}/${name}`)
          .then(res=>res.json())
          .then(data=>setData(data.data)
          )
  },[change])
  return (
    <div className="flex flex-col pt-6 w-full">
    <div className="overflow-x-auto bg-white border border-line rounded-2xl shadow-card">
      <div className="py-2 inline-block min-w-full">
        <div className="overflow-hidden">

         {data?.length?<table className="min-w-full rounded-lg">
            <thead className="border-b border-line rounded-lg">
            <HeaderRow/>
            </thead>
           <TableBody name={name} data={data}/>
          </table>:<div className='flex flex-col justify-center items-center py-10'>
            <Image src={pic} alt='no data' width={1000} height={1000} className='md:w-1/3 w-2/3'/>
            <p className="text-muted text-sm mt-2">No data yet — rows you add will show up here.</p>
            </div>}
        </div>
      </div>
    </div>
  </div>
  )
}
