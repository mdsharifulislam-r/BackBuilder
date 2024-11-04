'use client'
import React from 'react'
import { FaRegClipboard } from 'react-icons/fa'
import CodeShow from './CodeShow'
import copy from 'clipboard-copy'
import toast from 'react-hot-toast'
export default function Get({url}:{url:string}) {
    const copySomeThing = async ()=>{
        try {
          await copy(url)
          toast.success('URL copy successfully')
        } catch (error) {
          console.log(error);
          
        }
    }
    const code = `  fetch('${url}')
    .then(response=>response.json())
    .then(data=>console.log(data))  // Your Response is here
    .catch(err=>console.log(err))   // For Error Handleing`
  
  return (
    <div className='bg-white w-full min-h-40 shadow-lg rounded-md relative'>
        <div className="clip -translate-y-2 shadow-lg bg-blue-600 w-[30%] py-3 rounded-md mx-auto">
        </div>
        <div className="text px-4 pb-4">
            <div className=' text-center'>
            <h1 className='text-2xl font-bold text-orange'><span className='text-blue-600'>G</span>ET</h1>
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
                    Using this api url you can access data of database And you can use it in future.
                    You can customize this endpoint by customize the name and field. you can get signle data using primay_id. pass primay id as paramiter after the endpoint. you can also get data using search params. Example endpoint?name=sharif&age=22.
                </p>
            </div>
        </div>
      
    </div>
  )
}
