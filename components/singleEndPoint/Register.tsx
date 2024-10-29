'use client'
import React from 'react'
import { FaRegClipboard } from 'react-icons/fa'
import CodeShow from './CodeShow'
import copy from 'clipboard-copy'
import toast from 'react-hot-toast'
import { useCookies } from 'next-client-cookies'
import { useAppSelector } from '@/lib/hooks/hooks'
import JWT from "jwt-simple"
import { strict } from 'assert'
export default function Register({name,type}:{name:string,type:string}) {
    const cookie = useCookies()
    const token = cookie.get('token')
  
    
    const user_id = JWT.decode(token||"",process.env.NEXT_PUBLIC_JWT_SECRET!)
    const project_id = useAppSelector(state=>state.cartReduicer.project_id)
   const url = `${process.env.NEXT_PUBLIC_BASE_URL}/account/${user_id}/${project_id}/${name}/${type}`
    const copySomeThing = async ()=>{
        try {
          await copy(url)
          toast.success('URL copy successfully')
        } catch (error) {
          console.log(error);
          
        }
    }
    const code = `fetch('${url}',{
        method:'POST',
        body:JSON.stringify({
            // your body here
        })
      })`
  return (
    <div className='bg-white w-full min-h-40 shadow-lg rounded-md relative'>
        <div className="clip -translate-y-2 shadow-lg bg-blue-600 w-[30%] py-3 rounded-md mx-auto">
        </div>
        <div className="text px-4 pb-4">
            <div className=' text-center'>
            <h1 className='text-2xl font-bold text-orange'>{type!=='login'?<><span className='text-blue-600'>R</span>EGISTER</>:<><span className='text-blue-600'>L</span>OGIN</>}</h1>
            </div>
            <div className='flex justify-between place-items-center bg-dark px-3 text-xs py-2 mt-3 rounded-md'>
                <span className='text-slate-500'>{url}</span>
                <span className=' cursor-pointer' onClick={copySomeThing}>
                    <FaRegClipboard/>
                </span>
            </div>
            <span className='text-sm text-slate-600 py-2 mt-5 block'>Make Request using this url. expamle in JS</span>
            <CodeShow code={code}/>
            <div>
                <p className='text-slate-500 text-sm mt-4'>
                    {type!=='login'?'Using this api url you can Register a new account in database And you can use it in future. You can customize this endpoint by customize the name and field.':"Using this api we can login in existing account in database and get back our data"}
                </p>
            </div>
        </div>
      
    </div>
  )
}
