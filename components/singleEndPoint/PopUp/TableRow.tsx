import React, { useEffect, useState } from 'react'
import { endpoint } from '../Table/TableRow'
import { RxCross1 } from 'react-icons/rx'
import toast from 'react-hot-toast'

import { revalidateTag } from 'next/cache'
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hooks'
import { changeDataChange } from '@/lib/Store/features/CartSlice'

export default function TableRow({content,index,setChange,endpoint_name}:{content:endpoint,index:number,setChange:React.Dispatch<React.SetStateAction<boolean>>,endpoint_name:string}) {
  const Dispatch = useAppDispatch()
  const project_id = useAppSelector(state=>state.cartReduicer.project_id)
    const [formData,setFormData]=useState({
        schema_id:0,
        name:"",
        type:"",
        required:false,
    })
    useEffect(()=>{
        setFormData({
            schema_id:content?.schema_id,
            name:content?.name,
            type:content?.type,
            required:content?.required
        })
    },[])

    const deletRow = async ()=>{
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/schema/${content.schema_id}`,{
        method:"DELETE",
        body:JSON.stringify({
          project_id,
          schma_name:content.name,
          endpoint_name:endpoint_name
        })
      })
      const data = await res.json()
      if(data.success){
        toast.success(data.message)
        setChange(prev=>!prev)
        Dispatch(changeDataChange())
      }else{
        toast.error(data.message)
      }
    }
  return (
    <tr className="bg-white border-b">
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
      {index+1}
    </td>
    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      <input type="text" className='w-[60%]' value={formData.name} />
    </td>
    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      <button onClick={deletRow}>
      <RxCross1/>
      </button>
     
    </td>
    
  </tr>
  )
}
