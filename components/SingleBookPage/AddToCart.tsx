'use client'
import { useAppDispatch } from '@/lib/hooks/Hooks'
import { addCartData, cartItem } from '@/lib/Store/features/CartSlice'
import { Booktype } from '@/lib/Types/Types'
import React, { useState } from 'react'

export default function AddToCart({item}:{item:Booktype}) {
    const [amount,setAmount]=useState(1)
    const dispatch = useAppDispatch()
    function sendDatainCart(){
      const data:cartItem={
        _id:item?._id,
        cartId:Math.random().toString(),
        image:item.image,
        price:item.price,
        author:item.instructor.name,
        name:item?.name,
        type:"book",
        amount:amount
      }
      dispatch(addCartData(data))
    }
  return (
    <div className="flex place-items-center gap-3 py-4 ">
    <div className="isnput border p-2 rounded-md">
      <button className="p-2" onClick={()=>amount>1 && setAmount(prev=>prev-1)}>-</button>
      <input type="text" value={amount}  className="w-20 focus:outline-none text-center"  />
      <button onClick={()=>setAmount(prev=>prev+1)} className="p-2">+</button>
    </div>
    <button onClick={sendDatainCart} className='px-3 py-4 bg-secondary text-white rounded-md'>Add To Cart</button>
  </div>
  )
}
