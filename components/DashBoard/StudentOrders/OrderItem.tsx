"use client"
import { cencelOrder } from '@/lib/Helper/cencelOrder'
import { OrderType } from '@/lib/Types/Types'
import React, { Dispatch, SetStateAction } from 'react'
import toast from 'react-hot-toast'
import CencelButton from './CencelButton'

export default function OrderItem({_id,price,status,orderDate,userId,address,orderId,setOrderId}:OrderType&{setOrderId:Dispatch<SetStateAction<string>>}) {

  return (
    <>
    <tr className='py-2 cursor-pointer relative overflow-auto'>
    <td className="p-2 whitespace-nowrap">
        <div className="flex items-center text-slate-500">
       #{orderId}
        </div>
 
    </td>
    <td className="p-2 whitespace-nowrap text-slate-500">
        <div className="text-left ">${price}</div>
    </td>
    <td className="p-2 whitespace-nowrap text-slate-500">
        <div className="text-left ">{orderDate}</div>
    </td>
    <td className="p-2 whitespace-nowrap text-slate-500">
<div className='py-2'>{address}</div>
    </td>
    <td className="p-2 whitespace-nowrap">
<div>
    <span className='px-2 py-1 rounded-md bg-red-50 text-red-800 text-xs'>{status}</span>
</div>
    </td>
    <td className="p-2 whitespace-nowrap">
        <label htmlFor={_id} className='px-2 py-1 bg-secondary text-white rounded-md cursor-pointer'> Cencel </label>
<CencelButton orderId={_id||""}/>
    </td>
    <td className="p-2 whitespace-nowrap">
        <label className='px-2 py-1 bg-primary text-white rounded-md cursor-pointer' onClick={()=>setOrderId(_id!)}> view </label>

    </td>
</tr>

</>
  )
}
