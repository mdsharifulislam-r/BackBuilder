'use client'
import Image from 'next/image'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import pic from "@/assets/images/console.png"
import toast from 'react-hot-toast'
import ChangePassword from './ChangePassword'
import AccountDelete from './AccountDelete'
export default function UserInfo() {
    const [formData,setFormData]=useState({
        email:"",
        name:""
    })
    useEffect(()=>{
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users`)
            .then(res=>res.json())
            .then(data=>{
                if(data.success){
                  
                    
                    setFormData({
                        email:data?.data?.email,
                        name:data?.data?.name
                    })
                }else{
                    toast.error(data?.message)
                }
            })
    },[])

    const addValue = (e:ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = e.target
        setFormData({...formData,[name]:value})
    }
    const submitData =async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const {name,email} = formData
        if(!name || !email){
            toast.error('Fill all data')
            return
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users`,{
            method:"PUT",
            body:JSON.stringify(formData)
        })
        const data = await res.json()
        if(data?.success){
            toast.success(data?.message)
        }else{
            toast.error(data?.message)
        }
    }
    const [show,setShow]=useState(false)
    const [deleteShow,setDeleteShow]=useState(false)
  return (
    <div className='flex place-items-center bg-white border border-line rounded-2xl shadow-card overflow-hidden'>
      <div className="form md:w-1/2 w-full">
      <form onSubmit={submitData} action="">
        <div className='px-6 py-5 bg-primary text-white text-xl font-semibold'>
            Personal Information
        </div>
        <div className='p-6'>
            <div className='flex flex-col py-2'>
                <label htmlFor="" className='text-sm font-medium text-ink mb-1'>Name</label>
                <input type="text" onChange={addValue} name='name' value={formData.name} className='px-4 py-2.5 focus:outline-none focus:border-primary border border-line rounded-lg transition-colors' placeholder='Your Name' />
            </div>
            <div className='flex flex-col py-2'>
                <label htmlFor="" className='text-sm font-medium text-ink mb-1'>Email Address</label>
                <input type="email" onChange={addValue} name='email'  value={formData.email} className='px-4 py-2.5 focus:outline-none focus:border-primary border border-line rounded-lg transition-colors' placeholder='Email Address' />
            </div>
            <div className='my-5 flex gap-4'>
                <button className='px-4 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-lg transition-colors'>Update</button>
                <button onClick={()=>setShow(!show)} type='button' className='px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-ink text-sm font-medium rounded-lg transition-colors'>Change Password</button>
            </div>
        </div>
      </form>
      <div className='px-6 pb-6'>
        <h1 className='text-red-500 text-lg font-semibold'>Danger Zone</h1>
        <button onClick={()=>setDeleteShow(!deleteShow)} className='px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium my-3 rounded-lg transition-colors'>Delete My Account</button>
    
      </div>
      </div>
      <div className="imag w-1/2 md:block hidden">
        <Image
        src={pic}
        alt='image'
        width={1000}
        height={1000}
        />
      </div>
     {show? <ChangePassword setShow={setShow}/>:""}
     {deleteShow? <AccountDelete setShow={setDeleteShow}/>:""}
    </div>
  )
}
