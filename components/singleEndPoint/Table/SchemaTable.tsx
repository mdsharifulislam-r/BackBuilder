'use client'
import { useAppSelector } from '@/lib/hooks/hooks'
import React, { useEffect, useState } from 'react'
import TableRow, { endpoint } from './TableRow'
import toast from 'react-hot-toast'

export default function SchemaTable() {
  const endpoint_id = useAppSelector(state=>state.cartReduicer.endpoint_id)
  const changePoint = useAppSelector(state=>state.cartReduicer.dataChange)
  const [fieldData,setFieldData]=useState<endpoint[]>()
  useEffect(()=>{
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/schema/${endpoint_id}`)
      .then(res=>res.json())
      .then(data=>{
        
        if(data.success){
         setFieldData(data?.data)
         
        }else{
          toast.error(data?.message)
        }
      })
  },[changePoint])
  const showTable = fieldData?.map((item,index)=>(
    <TableRow
    key={item.primary_id}
    content={item}
    index={index}
    />
  ))
  return (
    <div className="flex flex-col pt-2">
    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div className="overflow-hidden">
          <table className="min-w-full rounded-md">
            <thead className="border-b rounded-md">
              <tr className='bg-blue-600 text-white'>
                <th
                  scope="col"
                  className="text-sm font-medium px-6 py-4 text-left"
                >
                  #
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium px-6 py-4 text-left"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium px-6 py-4 text-left"
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium px-6 py-4 text-left"
                >
                  Required
                </th>
              </tr>
            </thead>
            <tbody>
           {showTable}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  
  )
}
