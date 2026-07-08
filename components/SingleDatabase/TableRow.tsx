import { useAppDispatch, useAppSelector } from '@/lib/hooks/hooks'
import { useCookies } from 'next-client-cookies'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import { RxCross1 } from 'react-icons/rx'
import JWT from "jwt-simple"
import toast from 'react-hot-toast'
import { changeDataChange } from '@/lib/Store/features/CartSlice'
import { FaCheck } from 'react-icons/fa'
export default function TableRow({content,index,name}:{content:any,index:number,name:string}) {
    const values :string[]= Object.values(content)
    const keys:string[] = Object.keys(content)
    const keysData:string[] = keys?.slice(1,values?.length)
    const data:string[] = values?.slice(1,values?.length)
    const project_id = useAppSelector(state=>state.cartReduicer.project_id)
    const cookie = useCookies()
    const dispatch = useAppDispatch()
    const token = cookie.get('token')
    const user_id = JWT.decode(token!,process.env.NEXT_PUBLIC_JWT_SECRET!)
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/user/${user_id}/${project_id}/${name}`

    const [isEdit,setIsEdit]=useState(false)
    const [formData,setFormData]=useState<any>({})
    const changeFunc = (e:ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target
        setFormData({...formData,[name]:value})
    }
    useEffect(()=>{
        setFormData(content)
    },[])
    const showData = data?.map((item,index)=>(
        <td key={index} className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {isEdit?<input className='border' onChange={changeFunc} type="text" value={formData[keysData[index]]||""} name={keysData[index]} />:<span onDoubleClick={()=>setIsEdit(!isEdit)}>{formData[keysData[index]]}</span>}
      </td>
    ))
    const updateData = async ()=>{
        const res = await fetch(`${url}/${content?.primary_id}`,{
            method:"PUT",
            body:JSON.stringify(formData)
        })
        const data = await res.json()
        if(data.success){
            setIsEdit(false)
            toast.success(data.message)
            dispatch(changeDataChange())
        }else{
            toast.error(data.message)
        } 
    }

const deleteFunc =async () =>{
    const res = await fetch(`${url}/${content?.primary_id}`,{
        method:"DELETE"
    })
    const data = await res.json()
    if(data.success){
        toast.success(data.message)
        dispatch(changeDataChange())
    }else{
        toast.error(data.message)
    }
} 
    
  return (
    <tr className="bg-white border-b">
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
      {index+1}
    </td>
    {showData}
    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        <div className='flex gap-4'>
        {isEdit?<button onClick={()=>setIsEdit(prev=>!prev)}><RxCross1/></button>:<button onClick={deleteFunc}><RxCross1/></button>}
        {!isEdit?<button onClick={()=>setIsEdit(prev=>!prev)}><CiEdit/></button>:<button onClick={updateData}><FaCheck/></button>}
        </div>
      
    </td>
  </tr>
  )
}
