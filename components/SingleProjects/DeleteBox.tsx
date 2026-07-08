import { useAppSelector } from '@/lib/hooks/hooks'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

export default function DeleteBox({name,setShow}:{name:string,setShow:React.Dispatch<React.SetStateAction<boolean>>}) {
    const [temp,setTemp]=useState("")
    const tempName = name.toLowerCase().split(" ").join("-")
    const project_id = useAppSelector(state=>state.cartReduicer.project_id)
    const router = useRouter()
    const DeleteProject = async ()=>{
        toast.promise(fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/projects/${project_id}`,{
            method:"DELETE"
        }),{
            loading:"Project Deleting",
            error:"Project Deletinting failed",
            success:"Project Deleted successfully"
        })
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/projects/${project_id}`,{
            method:"DELETE"
        })
        const data = await res.json()
        
        if(data.success){
            
            router.push('/console')
        }else{
            toast.error(data.message)
        }
       

    }
  return (
    <div className='fixed w-full h-full top-0 left-0 flex justify-center place-items-center z-20'>
        <div onClick={()=>setShow(prev=>!prev)} className="absolute cursor-pointer w-full h-full top-0 left-0 bg-black/40"></div>
        <div className="relative md:w-[420px] w-[85%] bg-white min-h-36 rounded-2xl shadow-soft p-6">
            <h1 className='text-xl font-bold text-ink'>Delete <span className='text-secondary'>{name}</span>?</h1>
            <p className='text-sm text-muted mt-1'>This will permanently delete all schemas, endpoints, and data for this project.</p>
            <div className="mt-4">
                <label htmlFor="" className="text-sm text-muted">Type {'"'+tempName+'"'} to confirm</label>
                <input onChange={(e)=>setTemp(e.target.value)} type="text" className='w-full border border-line mt-2 rounded-lg text-sm px-3 py-2.5 focus:outline-none focus:border-primary transition-colors' />
                <div className='flex gap-3 pt-6'>
                    <button onClick={()=>setShow(prev=>!prev)}  className='px-4 py-2 bg-slate-100 text-ink text-sm font-medium rounded-lg hover:bg-slate-200 transition-colors'>Cancel</button>
                    <button onClick={DeleteProject} disabled={temp!=tempName} className={`px-4 py-2 text-sm font-medium ${temp!=tempName?'bg-slate-300':"bg-red-600 hover:bg-red-700"} transition-all duration-300 text-white rounded-lg`}>Delete</button>
                </div>
            </div>
        </div>
    </div>
  )
}
