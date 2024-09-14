"use client"
import { cencelOrder } from '@/lib/Helper/cencelOrder'
import React from 'react'
import toast from 'react-hot-toast'
import { changeSingleOrders } from './StudentOrders'

export default function CencelButton({orderId}:{orderId:string}) {
    async function CencelOrder() {
        const res = await cencelOrder(orderId||"")
        if(res.isOk){
            changeSingleOrders()
            toast.success(res.massage)
        }else{
            toast.error(res.massage)
        }
    }
  return (
    <>
    <input type="checkbox" name="" id={orderId} className='peer/cencelOrder hidden' />
    <div className='fixed w-full h-screen bg-[rgba(0,0,0,0.2)] top-0 left-0 hidden  z-20 peer-checked/cencelOrder:flex justify-center place-items-center'>
<div className='md:w-[50%] w-[80%] text-wrap bg-white rounded-md  p-5'>
<h1 className='text-3xl font-bold'>Are you Sure want <span className='text-secondary'> cencel </span>your Order <span className='text-secondary'>?</span></h1>
<div className='flex gap-2 place-items-center py-3'>
    <label className='px-3 py-2 bg-primary  text-white rounded-md' htmlFor={orderId}>Back</label>
    <button onClick={CencelOrder} className='px-3 py-2 bg-secondary text-white rounded-md'>Cencel</button>
</div>
<div>

</div>
</div>
</div>
</>
  )
}
