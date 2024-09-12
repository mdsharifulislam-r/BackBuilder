"use client"
import { useAppDispatch } from '@/lib/hooks/Hooks'
import { addCartData, cartItem } from '@/lib/Store/features/CartSlice'
import { Booktype } from '@/lib/Types/Types'
import { FaArrowRight } from 'react-icons/fa'

export default function AddCartButton({name,_id,instructor,price,image}:any) {
    const dispatch = useAppDispatch()
    function sendDatainCart(){
        const data:cartItem={
          _id:_id,
          cartId:Math.random().toString(),
          image:image,
          price:price,
          author:instructor.name,
          name:name,
          type:"book",
          amount:1
        }
        dispatch(addCartData(data))
      }
  return (
    <div>
    <button onClick={sendDatainCart} className='md:px-4 px-2 md:py-2 py-1 text-[10px] rounded-md transition-all duration-300 hover:bg-primary bg-secondary text-white md:text-xs font-bold flex place-items-center gap-1'>Add to Cart <FaArrowRight/> </button>
    </div>
  )
}
