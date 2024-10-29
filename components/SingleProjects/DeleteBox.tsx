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
        <div onClick={()=>setShow(prev=>!prev)} className="absolute cursor-pointer w-full h-full top-0 left-0 bg-black opacity-30"></div>
        <div className="relative md:w-[30%] w-[80%] bg-white min-h-36 rounded-md p-5">
            <h1 className='text-xl font-bold text-blue-600'>Are you sure delete this <span className='text-orange'>{name}?</span></h1>
            <p className='text-sm font-light text-slate-600'>If you delete this project. you will be delete your all of schmeas,endpoints,database of this project</p>
            <div>
                <label htmlFor="">To coutniue write {'"'+tempName+'"'}</label>
                <input onChange={(e)=>setTemp(e.target.value)} type="text" className='w-full border mt-2 rounded-sm text-base ' />
                <div className='flex gap-3 pt-8'>
                    <button onClick={()=>setShow(prev=>!prev)}  className='px-3 p-1 bg-blue-600 text-white rounded-md'>Cencel</button>
                    <button onClick={DeleteProject} disabled={temp!=tempName} className={`px-3 p-1 ${temp!=tempName?'bg-slate-500':"bg-red-600"} transition-all duration-500  text-white rounded-md`}>Delete</button>
                </div>
            </div>
        </div>
    </div>
  )
}
