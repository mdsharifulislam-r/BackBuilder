import LoadingButton from '@/components/common/button/Button'
import { useAppSelector } from '@/lib/hooks/hooks'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

export default function DeletePopUp({name,setHide}:{name:string,setHide:React.Dispatch<React.SetStateAction<boolean>>}) {
    const primary_id = useAppSelector(state=>state.cartReduicer.endpoint_id)
    const project_id = useAppSelector(state=>state.cartReduicer.project_id)
    const router = useRouter()
    const [Loading,setLoading]=useState(false)
    const deleteEnd = async ()=>{
        setLoading(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/endpoints/${primary_id}`,{
            method:"DELETE",
            body:JSON.stringify({
                project_id,
                name
            })
        })
        const data = await res.json()
        if(data.success){
            setLoading(false)
            toast.success(data.message)
            router.push(`/projects/${project_id}`)
        }else{
            setLoading(false)
            toast.error(data.message)
        }
    }
  return (
    <div className='fixed w-full h-full left-0 top-0 flex justify-center place-items-center z-20'>
        <div onClick={()=>setHide(prev=>!prev)} className="absolute w-full h-full cursor-pointer bg-black left-0 top-0 opacity-25 z-20"></div>
        <div className="relative md:w-[30%] w-[80%] bg-white min-h-44 z-30 rounded-md p-2">
            <div className='text-center py-3'>
                <h1 className='text-2xl text-blue-600'>Are you sure delete this <span className='text-orange'>{name}?</span></h1>
             
            </div>
            <p className='text-sm px-3 text-slate-400'>If you delete this Endpoint you will delete this endpoints Schemas and and all data of this endpoitns of Database</p>
            <div className='py-4 flex justify-center place-items-center gap-3 '>
                <button onClick={()=>setHide(prev=>!prev)} className='bg-blue-600 shadow-lg px-3 py-2 rounded-md text-white'>Cencel</button>
                <LoadingButton isLoading={Loading} onClick={deleteEnd} className='bg-red-600 shadow-lg px-3 py-2 rounded-md text-white'>Delete</LoadingButton>
            </div>
        </div>
      
    </div>
  )
}
