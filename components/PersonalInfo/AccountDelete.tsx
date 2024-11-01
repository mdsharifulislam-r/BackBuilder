import React, { ChangeEvent, FormEvent, useState } from 'react'
import LoadingButton from '../common/button/Button'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/lib/hooks/hooks'
import { Logout } from '@/lib/Store/features/UserSclice'

export default function AccountDelete({setShow}:{setShow:React.Dispatch<React.SetStateAction<boolean>>}) {
    const [text,setText]=useState("")
    const [loading,setLoading]=useState(false)
    const router = useRouter()
    const Dispatch = useAppDispatch()
    const submitHandle =async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
     if(text!=='delete-me'){
        return
     }
        setLoading(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/changepassword`,{
            method:"DELETE",
        
        })
        const data = await res.json()
        if(data?.success){
            setLoading(false)
            toast.success(data?.message)
            setShow(prev=>!prev)
            Dispatch(Logout())
            router.push("/")
        }else{
            setLoading(false)
            toast.error(data?.message)
        }
    }
  return (
    <div className='fixed w-full h-screen top-0 left-0 flex justify-center place-items-center'>
      <div onClick={()=>setShow(prev=>!prev)}  className="absolute w-full h-screen cursor-pointer top-0 left-0 bg-black opacity-40 z-0"></div>
      <form onSubmit={submitHandle} className="w-[30%] bg-white  rounded-md relative z-30 p-5">
        <h1 className='text-2xl font-semibold text-blue-600 p-4 text-center'>Are You sure want delete your <span className='text-orange'>Account?</span></h1>
        <p className='text-sm font-light my-2'>If you delete your account you will deleted all your data from the database</p>
        <div>
           
            <div className='flex flex-col'>
                <label htmlFor="">To delete your account write {'"delete-me"'}</label>
                <input type="text" placeholder='' onChange={(e)=>setText(e.target.value)}  name='conPassword' className='px-3 py-1 focus:outline-none my-1 border rounded-md shadow' />
            </div>
            <div>
                <LoadingButton isLoading={loading} className={`w-full py-1 rounded-md my-2 ${text=='delete-me'?"bg-red-600":"bg-gray-400"} transition-all duration-500 text-white`}>Change Password</LoadingButton>
            </div>
        </div>
      </form>

    </div>
  )
}
