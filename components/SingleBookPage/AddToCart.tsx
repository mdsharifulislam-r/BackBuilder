'use client'
import React, { useState } from 'react'

export default function AddToCart() {
    const [amount,setAmount]=useState(1)

  return (
    <div className="flex place-items-center gap-3 py-4 ">
    <div className="isnput border p-2 rounded-md">
      <button className="p-2" onClick={()=>amount>1 && setAmount(prev=>prev-1)}>-</button>
      <input type="text" value={amount}  className="w-20 focus:outline-none text-center"  />
      <button onClick={()=>setAmount(prev=>prev+1)} className="p-2">+</button>
    </div>
    <button   className='px-3 py-4 bg-secondary text-white rounded-md'>Add To Cart</button>
  </div>
  )
}
