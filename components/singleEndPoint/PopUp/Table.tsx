'use client'
import React, { useEffect, useState } from 'react'
import TableRow from './TableRow'
import { useAppSelector } from '@/lib/hooks/hooks'
import { endpoint } from '../Table/TableRow'
import toast from 'react-hot-toast'


export default function Table() {
  const endpoint_id = useAppSelector(state=>state.cartReduicer.endpoint_id)
  const [fieldData,setFieldData]=useState<endpoint[]>()
  const [change,setChange]=useState(false)
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
  },[])
  const showTable = fieldData?.map((item,index)=>(
    <TableRow
    key={item.schema_id}
    content={item}
    index={index}
 
    />
  ))
  return (
    <div className="flex flex-col">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full">
          <thead className="border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                #
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Name
              </th>
              
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Handle
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
