'use client'
import React, { useEffect } from 'react'
import Post from './Post'
import { useCookies } from 'next-client-cookies'
import JWT from "jwt-simple"
import { useAppSelector } from '@/lib/hooks/hooks'
import copy from 'clipboard-copy'
import toast from 'react-hot-toast'
import Get from './Get'
import Put from './Put'
import Delete from './Delete'
import Register from './Register'
import { useRouter } from 'next/navigation'
export default function MainContainer({name}:{name:string}) {
    const cookie = useCookies()
    const token = cookie.get('token')
    const router = useRouter()
    useEffect(()=>{
      if(!token){
        router.push('/')
        
      }
    },[])
    if(!token){
      router.push('/')
      return <></>
    }
    const user_id = JWT.decode(token||"",process.env.NEXT_PUBLIC_JWT_SECRET!)
    const project_id = useAppSelector(state=>state.cartReduicer.project_id)
    const isAccount = useAppSelector(state=>state.cartReduicer.account)
   const url = `${process.env.NEXT_PUBLIC_BASE_URL}/user/${user_id}/${project_id}/${name}`
  return (
    <div>
      <div>
        <h1 className='text-2xl text-blue-600 font-bold'>API <span className='text-orange'>Methods</span></h1>
        <div className="cont lg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid gap-4 mt-10">
            {!isAccount?<Post url={url}/>:<><Register name={name} type='register'/><Register name={name} type='login'/></>}
            <Get url={url}/>
            <Put url={url}/>
            <Delete url={url}/>
        </div>
      </div>
    </div>
  )
}
