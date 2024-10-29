'use client'
import { useAppSelector } from '@/lib/hooks/hooks'
import React, { useEffect, useState } from 'react'
import { endpoint } from '../singleEndPoint/Table/TableRow'
import toast from 'react-hot-toast'

export default function HeaderRow() {
    const endpoint_id = useAppSelector(state=>state.cartReduicer.endpoint_id)
    const [schemas,setSchemas]=useState<endpoint[]>([])
    useEffect(()=>{
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/schema/${endpoint_id}`)
        .then(res=>res.json())
        .then(data=>{
            if(data.success){
                setSchemas(data.data)
            }else{
                toast.error(data?.message)
            }
        })
    },[])
    const schemaShow = schemas?.map(item=>(
        <th
      scope="col"
      className="text-sm font-medium px-6 py-4 text-left"
      key={item.primary_id}
    >
      {item.name}
    </th>
    ))
  return (
    <tr className='bg-blue-600 text-white'>
    <th
      scope="col"
      className="text-sm font-medium px-6 py-4 text-left"
    >
      #
    </th>
    {schemaShow}
    <th
      scope="col"
      className="text-sm font-medium px-6 py-4 text-left"
    >
      Action
    </th>
  </tr>
  )
}
