"use client"
import TableData from './TableData'
import { getSingleUserOrders } from '@/lib/Helper/getSingleUserOrders'
import { getStudentInfo } from '@/lib/Helper/getStudent'
import { OrderType, Student } from '@/lib/Types/Types'
import { getSingleInstructor } from '@/lib/Helper/getSingleInstructor'
import { getStudentInfoClient } from '@/lib/Helper/GetStudentInfoClient'
import { use } from 'react'

export default  function OrderDetailsContainer({order}:{order:OrderType| undefined}) {
   
   
   
  const user:Student = use(getStudentInfoClient([],order?.userId))

  return (
    <div>
      <div className='text-slate-500 text-sm'>Order #<span className='text-red-500 bg-red-100 px-2 py-1'>{order?.orderId}</span> was placed on <span className='text-red-500 bg-red-100 px-2 py-1'>{order?.orderDate}</span> and is currently <span className='text-red-500 bg-red-100 px-2 py-1'>{order?.status}</span></div>
      <div className='pt-9'>
        <h1 className='text-2xl font-semibold'>Order Details</h1>
        <TableData item={order}/>
      </div>
      <div className='p-5'>
      <h1 className='text-2xl font-semibold py-3'>Billing Address</h1>
      <div className='border border-dashed flex flex-col gap-1 p-5 text-slate-600'>
      <div>
            Order Id: {order?.orderId}
        </div>
        <div>
            Name: {user?.name}
        </div>
        <div>
            Address: {order?.address}
        </div>
        <div>
            Phone: {user?.phone}
        </div>
        <div>
            Email: {user?.email}
        </div>
        <div>
            Total Price: {order?.price}
        </div>

      </div>
      </div>
    </div>
  )
}
