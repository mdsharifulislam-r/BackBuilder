import { OrderType } from '@/lib/Types/Types'
import React from 'react'

export default function OrderItem({_id,price,status,orderDate,userId,address}:OrderType) {
  return (
    <>
    <tr className='py-2 cursor-pointer relative overflow-auto'>
    <td className="p-2 whitespace-nowrap">
        <div className="flex items-center text-slate-500">
       #{_id}
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
<div>
    <button className='px-2 py-1 bg-red-600 text-white rounded-md'>Cencel</button>
</div>
    </td>
  
</tr>

</>
  )
}
