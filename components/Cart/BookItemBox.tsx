'use client'
import { getRandomClass } from '@/lib/colors/getRandomColor'
import { useAppDispatch } from '@/lib/hooks/Hooks'
import { addCartData, cartItem, deleteCartData, updateCartData } from '@/lib/Store/features/CartSlice'
import { Dispatch } from '@reduxjs/toolkit'
import Image from 'next/image'
import React, { ChangeEvent, SetStateAction, useState } from 'react'
import toast from 'react-hot-toast'
import { FaRegHeart, FaRegTrashAlt, FaTrash } from 'react-icons/fa'
const bg = getRandomClass()
export default function BookItemBox({_id,type,name,cartId,image,author,amount,price,setItem}:cartItem&{setItem?:any}) {
    const dispatch = useAppDispatch()
    function AddData(){
        const obj:cartItem={
            name:name,
            author:author,
            _id:_id,
            image:image,
            cartId:cartId,
            price:price,
            type:type,
            amount:amount
        }
        dispatch(addCartData(obj))
    }
    function Delete(){
      dispatch(deleteCartData(cartId))
      toast.custom(<h1 className='px-4 py-3 bg-white text-secondary rounded-lg'> Data deleted successfully <button onClick={AddData} className=' underline text-primary'>Undo</button></h1>,{
        position:"bottom-center"
      })
    }

 
    const am=amount
    const [tempAmount,setAmount]=useState(am)
    function SetAmount(e:ChangeEvent<HTMLInputElement>){
      if((parseInt(e.target.value)<1)){
        return
      }
      setAmount(parseInt(e.target.value))
        dispatch(updateCartData({cartId:cartId,amount: parseInt(e.target.value)}))
    }

  return (
    <div className="md:flex w-full overflow-x-hidden items-strech py-8 md:py-10 lg:py-8 border-t border-gray-50 place-items-center">

    <div className="md:w-4/12 2xl:w-1/4 w-full">
    <div className={`h-32 p-4 ${bg} flex justify-center rounded-md`} >
    <Image
        src={image}
        width={2000}
        height={2000}
        alt="Black Leather Purse"
        className="h-full w-[50%] rounded-md object-center object-cover md:block hidden"
      />
    </div>
    <div className={`h-32 p-4 ${bg} flex justify-center place-items-end rounded-md md:hidden my-3`} >
    <Image
        src={image}
        width={2000}
        height={2000}
        alt="Black Leather Purse"
        className=" w-[50%] max-h-56 md:max-h-full  rounded-md object-center object-cover "
      />
    </div>

    </div>
    <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
     
      <div className="flex items-center justify-between w-full">
        <p className="text-base font-black leading-none text-gray-800">
         {name}
        </p>
        <div className="isnput flex border p-2 rounded-md">

      <input type="number" value={tempAmount} onChange={SetAmount}  className="w-20 focus:outline-none text-center"  />

    </div>
      </div>
      <p className="text-xs leading-3 text-gray-600 pt-2">
        by {author}
      </p>
    
      <div className="flex items-center justify-between pt-5">
        <div className="flex itemms-center">
          <p className="text-xs leading-3 underline text-gray-800 cursor-pointer">
            <button className='p-3 rounded-md bg-teal-200 text-teal-600'><FaRegHeart/></button>
          </p>
          <p className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer">
            <button onClick={Delete} className='p-3 rounded-md bg-red-200 text-red-600'><FaRegTrashAlt/></button>
          </p>
        </div>
        <p className="text-base font-black leading-none text-gray-800">
          ${price}
        </p>
      </div>
    </div>
  </div>
  )
}
