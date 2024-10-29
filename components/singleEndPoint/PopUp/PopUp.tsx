'use client'
import React, { useState } from 'react'
import Table from './Table'
import LoadingButton from '@/components/common/button/Button'
import { endpoint } from '../Table/TableRow'
import AddRow from './AddRow'

export default function PopUp({setShow,endpoint_name}:{setShow:React.Dispatch<React.SetStateAction<boolean>>,endpoint_name:string}) {
  const [deleteArr,setDeleteArr]=useState<endpoint[]>([])
  const [updateArr,setUpdateArr]=useState<endpoint[]>([])
  return (
    <div className='p-4 py-5'>
      
      <div  className='fixed cursor-pointer h-full w-full top-0 left-0 flex justify-center place-items-center z-50'>
        <div onClick={()=>setShow(prev=>!prev)} className='absolute cursor-pointer h-full w-full top-0 left-0 opacity-30 bg-black' >

        </div>
      <div className='md:w-[30%] min-h-96 bg-white w-[80%] rounded-md relative z-10'>
          <div className="py-3 bg-blue-600 rounded-md mx-auto shadow-lg -translate-y-2 w-[30%]"></div>
          <div className='text-center'>
            <h1 className='text-2xl text-blue-600 font-bold'><span className='text-orange'>U</span>PDATE</h1>
          </div>
          <Table endpoint_name={endpoint_name} />
          <AddRow/>
         
        </div>
  
      </div>
      
     
    </div>
  )
}
