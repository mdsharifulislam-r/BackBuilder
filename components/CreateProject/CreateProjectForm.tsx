'use client'
import React, { FormEvent, useEffect, useRef } from 'react'
import pic from "@/assets/images/Create.gif"

import Image from 'next/image'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import LoadingButton from '../common/button/Button'
import { useCookies } from 'next-client-cookies'
export default function CreateProjectForm() {
  const cookie = useCookies()
  const token = cookie.get('token')
  const router = useRouter()
  useEffect(()=>{
    if(!token){
      router.push('/')
    }
  },[])
 
    const ref = useRef<HTMLFormElement|null>(null)
 
    const SubmitHandle = async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.currentTarget))
        if(!data.project_name){
            toast.error("Please enter a project name")
            return 
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/projects`,{
            method:"POST",
            body:JSON.stringify(data)
        })
        const response = await res.json()
        if(response.success){
            toast.success(response.message)
            ref.current?.reset()
            router.push("/console")
        }else{
            toast.error(response.message)
        }    
    }
  return (
    <div className='container flex place-items-center md:flex-row flex-col-reverse py-8'>
      <div className="form md:w-1/2 w-full px-3">
      <h1 className='text-3xl md:text-4xl font-bold text-primary'>Create a <span className='text-orange'>Project</span></h1>
      <span className='text-sm text-muted'>A project holds its own database, schemas and endpoints — give it a name to get started.</span>
      <form onSubmit={SubmitHandle} ref={ref} action="" className='py-6 space-y-4'>
        <input type="text" placeholder='Project Name' name='project_name' className='w-full px-4 py-3 rounded-lg border border-line focus:outline-none focus:border-primary transition-colors' />
        <textarea name="description" id="" placeholder='Description (optional)' className='w-full p-4 rounded-lg border border-line focus:outline-none focus:border-primary transition-colors min-h-28'></textarea>
        <LoadingButton className='px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors'>Create project</LoadingButton>
      </form>
      </div>
      <div className="image md:w-1/2 w-full">
        <Image src={pic} alt='image' width={1000} height={1000} loading='lazy'/>
      </div>
    </div>
  )
}
