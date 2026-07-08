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
import MultiSelect from '@/lib/hooks/MultipleSelect'

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
    required={item.required?"true":"false"}
    key={item.name}
    setFieldData={setFieldData}
    />
  ))
  const [name,setName]=useState("")
  const [values,setValues]=useState<string[]>([])

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
      is_user:isUser,
      is_auth_required:values?.join(",")
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
    {isUser?<p className='mt-2 p-3 rounded-lg shadow-card border border-line text-sm bg-white '>You must add two required fields: <span className='text-primary font-medium'>username/email</span> and <span className='text-red-600 font-medium'>password</span>, for authentication</p>:""}
    <form onSubmit={submitData} className='md:w-[80%] w-full mx-auto mt-7 bg-white p-8 md:p-10 rounded-2xl border border-line shadow-card'>
      <input type="text" name="" id="" className='w-full bg-slate-100 px-4 py-3 rounded-lg mb-4 text-muted' placeholder='Primary ID (provided automatically)' disabled />
      <input type="text" onChange={(e)=>setName(e.target.value)}  name="name" id="" className='w-full px-4 py-3 rounded-lg border border-line focus:outline-none focus:border-primary transition-colors' placeholder='Endpoint name' />
      <div className='flex items-center py-3 gap-3'>
        <label htmlFor="" className='font-medium text-ink text-sm block'>Authenticated methods</label>
        <MultiSelect
        options={[
          {label:"POST",value:"POST"},
          {label:"GET",value:"GET"},
          {label:"PUT",value:"PUT"},
          
          {label:"PATCH",value:"PATCH"},
          {label:"DELETE",value:"DELETE"}
        ]}
        onChange={(value)=>setValues(value.map(item=>item.value))}
        />
      </div>
      <div>
        <label htmlFor="" className='font-medium text-primary py-2 block'>Fields</label>
        <div>
         {fieldData.length ? <div className='py-3 overflow-x-auto'>
          <table className='w-full p-4'>
            <thead className=''>
              <tr className='text-slate-400 text-sm text-left'>
                <td className='py-2'>Name</td>
                <td className='py-2'>Type</td>
                <td className='py-2'>Required</td>
                <td className='py-2'>Action</td>
              </tr>
            </thead>
            <tbody>
          {showItem}
            </tbody>
          </table>
          </div>:""}
   
           <InputForm setFieldData={setFieldData}/>
        </div>
        <LoadingButton isLoading={isLoading} className='w-full px-3 py-3 rounded-lg mt-7 font-semibold bg-primary text-white hover:bg-primary-dark transition-colors'>Create endpoint</LoadingButton>
      </div>
    </form></>
  )
}
