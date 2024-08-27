'use client'
import { useAppDispatch, useAppSelector } from '@/lib/hooks/Hooks';
import React, { useEffect, useState } from 'react'
import { MdOutlineShoppingCart } from "react-icons/md";
import image from "@/assets/Home/PopulerCourse/course3.webp"
import Image from 'next/image';
import { addCartData, cartItem, deleteCartData } from '@/lib/Store/features/CartSlice';
import toast from 'react-hot-toast';
import Link from 'next/link';
import dynamic from 'next/dynamic';

export function makePrice(arr:cartItem[]):number{
  let sum = 0
  if(arr){

  
  for(let i of arr){
    if(i.price!=='free'
    ){
      sum+=parseInt(i.price)
    }
  }
}
return sum
}
function CartBox({name,_id,cartId,author,amount,image,price,type}:cartItem){
  const dispatch = useAppDispatch()
  function AddData(){
      const obj:cartItem={
          name:name,
          author:author,
          _id:_id,
          image:image,
          cartId:cartId,
          price:price,
          type:type
      }
      dispatch(addCartData(obj))
  }
  function Delete(){
    dispatch(deleteCartData(cartId))
    toast.custom(<h1 className='px-4 py-3 bg-white text-secondary rounded-lg'> Data deleted successfully <button onClick={AddData} className=' underline text-primary'>Undo</button></h1>,{
      position:"bottom-center"
    })
  }
  return <div className='flex gap-2 p-3 border-b relative'>
  <div className="absolute right-4 top-4">
    <button className='text-xl ' onClick={Delete}>x</button>
  </div>
  <div className="imageBpx w-[30%] h-40 relative">
    <Image src={image} alt='' className='absolute w-full h-full left-0 top-0 object-cover' width={300} height={300} />

  </div>
  <div>
    <h1 className='text-lg font-medium pb-1 '>{name}</h1>
    <p className='text-sm pb-2 text-slate-400'>by {author}</p>
    <div className="price text-base text-secondary capitalize">
      {price !== "free" ? `${price}`:price}<span>{amount}</span>
    </div>
  </div>
</div>
}
export default function Cart() {
 const data = useAppSelector(state=>state.cartReduicer.cartData)
 const cartItemData = data?.map(item=>{
  return <CartBox
  name={item?.name}
  _id={item?._id}
  cartId={item?.cartId}
  image={item?.image}
  author={item?.author}
  amount={item?.amount}
  type={item?.type}
  price={item?.price}
  key={item?.cartId}
  />
 })

 const price = makePrice(data)
  return (
    <li className='text-xl text-primary relative z-40'>
  
    <div className="cart">
    <div className="drawer drawer-end">
  <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Page content here */}
    <label htmlFor="my-drawer-4" className="drawer-button text-4xl relative"><MdOutlineShoppingCart/>
    <div className="absolute bg-primary text-white text-[8px] rounded-full w-4 flex justify-center place-items-center h-4 top-0 left-0">{data?.length}</div>
    </label>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-white text-base-content min-h-full w-96 p-4">
      <div className='text-lg font-bold pb-2 border-b'>
        Shopping Cart
      </div>
      <div className="cart py-3 max-h-80 overflow-y-scroll  scrollbar-thin scrollbar-track-dark scrollbar-thumb-secondary ">
        {cartItemData}
      </div>
      <div className='p-4 pt-8'>
        <div className="sub font-semibold flex justify-between place-items-center">
          <span>Subtotal</span>
          <span>${price}</span>
        </div>
        <div className='py-5 flex flex-col gap-3'>
          <Link href={"/cart"} className='w-full text-center  py-3 rounded-full bg-primary text-white'>View Cart</Link>
          <Link href={"/checkout"} className='w-full text-center py-3 rounded-full border-[1px] border-primary text-primary'>Checkout</Link>
        </div>
      </div>
    </ul>
  </div>
</div>
    </div>

  </li>
  )
}
