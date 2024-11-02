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
  if(!token){
    router.push('/')
    return <></>
  }
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
    <div className='container flex place-items-center md:flex-row flex-col-reverse'>
      <div className="form md:w-1/2 w-full px-3">
      <h1 className='text-4xl font-bold text-blue-600'>Create a <span className='text-orange'>Project</span></h1>
      <span className='text-sm font-extralight'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit a natus hic eveniet. Ad iure nesciunt, provident officia a iste!</span>
      <form onSubmit={SubmitHandle} ref={ref} action="" className='py-6'>
        <input type="text" placeholder='Project Name' name='project_name' className='w-full pt-7 mb-4 focus:outline-none border-b px-3 pb-3' />
        <textarea name="description" id="" placeholder='Descriction(Optional)' className='w-full p-4 focus:outline-none border-b'></textarea>
        <LoadingButton className='px-4 py-2 bg-blue-600 text-white rounded-md mt-4'>Create</LoadingButton>
      </form>
      </div>
      <div className="image md:w-1/2 w-full">
        <Image src={pic} alt='image' width={1000} height={1000} loading='lazy'/>
      </div>
    </div>
  )
}
