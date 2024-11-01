import React, { ChangeEvent, FormEvent, useState } from 'react'
import LoadingButton from '../common/button/Button'
import toast from 'react-hot-toast'

export default function ChangePassword({setShow}:{setShow:React.Dispatch<React.SetStateAction<boolean>>}) {
    const [formData,setFormData]=useState({
        oldPassword:"",
        newPassword:"",
        conPassword:""
    })
    const addValue = (e:ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target
        setFormData({...formData,[name]:value})
    }
    const submitHandle =async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const {newPassword,conPassword,oldPassword}=formData
        if(!oldPassword|| !newPassword || !conPassword){
            toast.error("Please fill all require field")
            return
        }
        if(newPassword!==conPassword){
            toast.error('password not match')
            return
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/changepassword`,{
            method:"PUT",
            body:JSON.stringify({
                newPassword,
                oldPassword
            })
        })
        const data = await res.json()
        if(data?.success){
            toast.success(data?.message)
            setShow(prev=>!prev)
        }else{
            toast.error(data?.message)
        }
    }
  return (
    <div className='fixed w-full h-screen top-0 left-0 flex justify-center place-items-center'>
      <div onClick={()=>setShow(prev=>!prev)}  className="absolute w-full h-screen cursor-pointer top-0 left-0 bg-black opacity-40 z-0"></div>
      <form onSubmit={submitHandle} className="md:w-[30%] w-[80%] bg-white  rounded-md relative z-30 p-5">
        <h1 className='text-2xl font-semibold text-blue-600 p-4 text-center'><span className='text-orange'>Change </span>Password</h1>
        <div>
            <div className='flex flex-col'>
                <label htmlFor="">Old Password</label>
                <input type="password" placeholder='Old password' onChange={addValue} name='oldPassword' className='px-3 py-1 focus:outline-none my-1 border rounded-md shadow' />
            </div>
            <div className='flex flex-col'>
                <label htmlFor="">New Password</label>
                <input type="password" placeholder='New password' onChange={addValue} name='newPassword' className='px-3 py-1 focus:outline-none my-1 border rounded-md shadow' />
            </div>
            <div className='flex flex-col'>
                <label htmlFor="">Confirmed Password</label>
                <input type="password" placeholder='Confirmed password' onChange={addValue} name='conPassword' className='px-3 py-1 focus:outline-none my-1 border rounded-md shadow' />
            </div>
            <div>
                <LoadingButton className='w-full py-1 rounded-md my-2 bg-blue-600 text-white'>Change Password</LoadingButton>
            </div>
        </div>
      </form>

    </div>
  )
}
