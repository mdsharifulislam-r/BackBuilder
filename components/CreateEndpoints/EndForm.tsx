'use client'
import React, { FormEvent, useEffect, useState } from 'react'
import InputForm from './InputForm'
import LoadingButton from '../common/button/Button'
import { TbCross } from 'react-icons/tb'
import { FaEdit, FaTrash } from 'react-icons/fa'
import ShowItem from './ShowItem'
import { useSelector } from 'react-redux'
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hooks'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useCookies } from 'next-client-cookies'

export default function EndForm() {
  const cookie = useCookies()
  const token = cookie.get('token')
  const router = useRouter()
  useEffect(()=>{
    if(!token){
      router.push('/')
    }
  },[])

  const [isLoading,setisLoading]=useState(false)
  const [fieldData,setFieldData]=useState<{name:string,type:string,required:boolean}[]>([])
  const project_id =useAppSelector(state=>state.cartReduicer.project_id)
  const isUser = useAppSelector(state=>state.cartReduicer.is_user)

  
  const showItem = fieldData.map(item=>(
    <ShowItem
    name={item.name}
    type={item.type}
    required={item.required?"true":"flase"}
    key={item.name}
    setFieldData={setFieldData}
    />
  ))
  const [name,setName]=useState("")
  const submitData =async (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(isUser){
      const exist = fieldData?.some(item=>item.name=='email'||item.name=='username')
      const passexist = fieldData?.some(item=>item.name=='password')
      if(!(exist&&passexist)){
        toast.error('please email/username end password field')
        return
      }
    }
    setisLoading(true)
   const res =await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/endpoints`,{
    method:"POST",
    body:JSON.stringify({
      name:name.toLowerCase().split(" ").join("_"),
      project_id,
      schmea:fieldData,
      is_user:isUser
    })
   })
    
    const data = await res.json()
    if(data.success){
      setisLoading(false)
      toast.success(data.message)
      router.push(`/projects/${project_id}`)
    }else{
      setisLoading(false)
      toast.error(data.message)
    }
    
  }
  return (
    <>
    {isUser?<p className='mt-2 p-3 rounded-md shadow-lg text-sm bg-white '>You have to add two required field <span className='text-blue-600'>username/email</span> and <span className='text-red-600'>password</span> for authentication</p>:""}
    <form onSubmit={submitData} className='md:w-[80%] w-full mx-auto mt-7 bg-white p-10 rounded-lg shadow-lg'>
      <input type="text" name="" id="" className='w-full bg-slate-100 px-4 py-2 rounded-md mb-4' placeholder='Primary ID Provided by Default' disabled />
      <input type="text" onChange={(e)=>setName(e.target.value)}  name="name" id="" className='w-full  px-4 py-2 rounded-md border focus:outline-none focus:shadow-lg ' placeholder='Enter End Point Name' />
      <div>
        <label htmlFor="" className=' font-thin text-blue-600 py-2 block'>Fields</label>
        <div>
         {fieldData.length ? <div className='py-3'>
          <table className='w-full p-4'>
            <thead className=''>
              <tr className='text-slate-400'>
                <td>Name</td>
                <td>Type</td>
                <td>Required</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
          {showItem}
            </tbody>
          </table>
          </div>:""}
   
           <InputForm setFieldData={setFieldData}/>
        </div>
        <LoadingButton isLoading={isLoading} className='w-full px-3 py-1 rounded-md mt-7 bg-blue-600 text-white'>Create</LoadingButton>
      </div>
    </form></>
  )
}
