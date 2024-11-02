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
  console.log(url);
  
  const change = useAppSelector(state=>state.cartReduicer.dataChange)
  
  const [data,setData]=useState<any[]>([])
  useEffect(()=>{
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/${user_id}/${project_id}/${name}`)
          .then(res=>res.json())
          .then(data=>setData(data.data)
          )
  },[change])
  return (
    <div className="flex flex-col pt-2 w-full">
    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div className="overflow-hidden">

         {data?.length?<table className="min-w-full rounded-md">
            <thead className="border-b rounded-md">
            <HeaderRow/>
            </thead>
           <TableBody name={name} data={data}/>
          </table>:<div className='flex justify-center place-items-center'>
            <Image src={pic} alt='no data' width={1000} height={1000} className='md:w-1/2'/>
            </div>}
        </div>
      </div>
    </div>
  </div>
  )
}
