'use client'
import React, { useEffect, useState } from 'react'
import { GoPlus } from 'react-icons/go'
import EndpointBox from './EndpointBox'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hooks'
import { Endpoints } from '@/lib/Types/types'
import { useDispatch } from 'react-redux'
import { setIsUser } from '@/lib/Store/features/CartSlice'
import { useCookies } from 'next-client-cookies'
import { useRouter } from 'next/navigation'

export default  function MainContainer() {
  const project_id= useAppSelector(state=>state.cartReduicer.project_id)
 const dispatch = useAppDispatch()
 const cookie = useCookies()
 const token = cookie.get('token')
 const router = useRouter()
 useEffect(()=>{
   if(!token){
     router.push('/')
   }
 },[])
  const [endpoints,setEndpoints]=useState<Endpoints[]>([])
  useEffect(()=>{
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/endpoints/${project_id}`)
      .then(res=>res.json()).then(data=>{
        if(data.success){
          setEndpoints(data?.data)
        }else{
          setEndpoints([])
        }
      })
  },[])
  const showEndpoint = endpoints?.map(item=>(
    <EndpointBox
    name={item.name}
    primary_id={item.primary_id}
    key={item.primary_id}
    is_user={item?.is_user}
    />
  ))
  return (
    <div className='pb-16'>
      <h1 className='text-4xl text-blue-600'>End<span className='text-orange'>points</span></h1>
      <div className="con grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 pt-6 gap-3">
      <Link onClick={()=>dispatch(setIsUser(true))} href={"/create-endpoint"} className="box w-full h-28 bg-white flex justify-center place-items-center flex-col  rounded-md shadow-lg">
            <div className='text-5xl text-orange'>
            <GoPlus/>
            </div>
            <h1 className='text-sm md:text-base'>New Users Endpoint</h1>
          
        </Link>
        <Link onClick={()=>dispatch(setIsUser(false))} href={"/create-endpoint"} className="box w-full h-28 bg-white flex justify-center place-items-center flex-col  rounded-md shadow-lg">
            <div className='text-5xl text-orange'>
            <GoPlus/>
            </div>
            <h1 className='text-sm md:text-base'>New CRUD Endpoint</h1>
          
        </Link>
        {showEndpoint}
      </div>
    </div>
  )
}
