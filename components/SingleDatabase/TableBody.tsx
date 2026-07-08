'use client'
import React, { useEffect, useState } from 'react'
import TableRow from './TableRow'
import { useAppSelector } from '@/lib/hooks/hooks'
import { useCookies } from 'next-client-cookies'
import JWT from "jwt-simple"
import Image from 'next/image'
import pic from '@/assets/images/nodata.gif'
export default function TableBody({data,name}:{data:any[],name:string}) {
   
    const show = data?.map((item,index)=>(
        <TableRow name={name} index={index} content={item} key={item.primary_id}/>
    ))
    
  return (

   <tbody>
    {show}
</tbody>
  )
}
