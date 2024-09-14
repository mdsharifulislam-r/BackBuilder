'use client'
import { OrderType } from '@/lib/Types/Types'
import React, { useEffect, useState } from 'react'
import { makePrice } from '../Common/Cart'
 function Item({name,amount,price,author}:{name:string,amount:number,price:string,author:string}){
  return (
    <tr className='border'>
    <td className='p-4 border text-slate-500'>
        <span>{name} x {amount}</span>
        <span className='block'>Author:{author}</span>
    </td>
    <td className='p-4 text-slate-500'>${price}</td>
</tr>
  )
}
export default function TableData({item}:{item:OrderType| undefined}) {
const orders = item?.orders?.map(order=>{
  return <Item
  name={order.name}
  amount={order.amount||0}
  price={order.price}
  author={order.author}
  key={order.orderId}

  />
})
  const [hydred,setHydred]=useState(false)
  useEffect(()=>{
    setHydred(true)
  })
  return (<>
     { hydred && <table className='w-full border p-4'> 
    <tr>
        <td className='text-left p-4 w-[40%]'>
            <h1 className='text-2xl font-light'>Product</h1>
        </td>
        <td className='text-left p-4 '>
            <h1 className='text-2xl font-light'>Total</h1>
        </td>
    </tr>
    <tbody>
       {orders}
    
        <tr className='border'>
            <td className='p-4 border text-darkBlack'>
                <span>Subtotal:</span>
            
            </td>
            <td className='p-4 text-slate-500'>${makePrice(item?.orders|| [])}</td>
        </tr>
        <tr className='border'>
            <td className='p-4 border text-darkBlack'>
                <span>Shipping:</span>
            
            </td>
            <td className='p-4 text-slate-500'>Free Shipping</td>
        </tr>
        <tr className='border'>
            <td className='p-4 border text-darkBlack'>
                <span>Payment Method:</span>
            
            </td>
            <td className='p-4 text-slate-500'>Cash on Delivary</td>
        </tr>
        <tr className='border'>
            <td className='p-4 border text-darkBlack'>
                <span>Total:</span>
            
            </td>
            <td className='p-4 text-slate-500'>${makePrice(item?.orders || [])}</td>
        </tr>
        
    </tbody>
</table>}
  </>

  )
}
