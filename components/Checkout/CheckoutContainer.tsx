'use client'
import React, { useState } from 'react'
import { FaLock } from 'react-icons/fa'
import PaymentBox from './PaymentBox'
import Details from './Details'
import { useAppDispatch, useAppSelector } from '@/lib/hooks/Hooks'
import { cartItem, clearCart, deleteCartData } from '@/lib/Store/features/CartSlice'
import { makePrice } from '../Common/Cart'
import LoadingButton from '../Common/Button/Button'
import { EnrollCourse } from '@/lib/Helper/EnrollCourse'
import toast from 'react-hot-toast'
import { orderItem, OrderType } from '@/lib/Types/Types'
import { createOrder } from '@/lib/Helper/createoOrder'
import { getStudentClient } from '@/lib/Helper/getStudentClient'
import { UpdateStudentInfoObject } from '@/lib/Helper/UpdateStudentObject'
import { setUpdateDiamon } from '../Common/Diamond/Diamond'
import PlaseLogin from './PlaseLogin'

export default function CheckoutContainer({id}:{id:string}) {
    const cartdata = useAppSelector(state=>state.cartReduicer.cartData)
    const user = useAppSelector(state=>state.userReduicer.user)
    const dispatch = useAppDispatch()
    const bookExist = cartdata?.some(item=>item.type=="book")
    const data:cartItem[] = id ? cartdata.filter(item=>item._id==id) : cartdata
    
    const price = makePrice(data)

  async function Enroll(courseId:string="") {
   const tempUser = await getStudentClient(["diamond"],id)
    
    const res = await EnrollCourse({
      courseId:courseId||id,
      userId:user?._id
    })
    if(res.isOk){
      const res2 = await UpdateStudentInfoObject({
        diamond:tempUser?.diamond? tempUser?.diamond +50 : 50
      })
      if(res2?.isOk){
        setUpdateDiamon()
      }
      toast.success(res.message)
      dispatch(deleteCartData(data[0]?.cartId))

    }else{
      toast.error(res.message)
    }
    
  }
const [loading,setLoading]=useState(false)
const address = useAppSelector(state=>state.cartReduicer.address)
async  function placeOrder(){

  
  if(!address && bookExist){
    toast.error("Please add a address first")
    return
  }
  if(cartdata?.length){
  setLoading(true)
  const freeCourse = cartdata?.filter(item=>item.price=='free')
  if(freeCourse?.length){
    freeCourse.forEach(item=>Enroll(item._id))
  }
  const paidItem = cartdata?.filter(item=>item.price!=='free')
  if(!paidItem?.length){
    return
  }
    const newArr:orderItem | any = paidItem?.map(item=>{
      const obj = {
        orderId:Math.random().toString(),
        userId:user?._id,
        status:"pending",
        orderDate:new Date().toLocaleDateString()
      }
      return {
        ...item,
        ...obj
      }

    })
  const dataObj:OrderType = {
orderDate:new Date().toDateString(),
userId:user?._id||"",
orders:newArr,
address:address,
price:makePrice(cartdata),
status:"pending",
orderId:Math.floor(Math.random()*1000000)
  }
  const res = await createOrder(dataObj)
  if(res.isOk){
    setLoading(false)
    toast.success(res.message)
    dispatch(clearCart())
  }else{
    setLoading(false)
    toast.error(res.message)
  }
}
  }
  return (
    <div className='container'>
   {user?.name ? <div className=' flex md:flex-row flex-col-reverse gap-4'>
      <div className='Payment w-full '>
        <textarea name="" id="" className='w-full min-h-32 p-4 rounded-md border shadow-xl focus:outline-primary' placeholder='Note for Teacher'></textarea>
        <div className="method pt-5">
        {price?<h1 className='text-2xl flex place-items-center gap-2 font-semibold'>Payment <span className='text-slate-300'><FaLock/></span>  <span className='text-slate-700 text-base'>Secure Connection</span></h1>:""}
       {price? <div className='py-3'>
            <PaymentBox />
        </div>:""}
        <div>
            {price ?<LoadingButton isLoading={loading} onClick={placeOrder} className='py-3 w-full bg-primary text-white'>Place Order</LoadingButton>:<LoadingButton onClick={()=>Enroll()} className='py-3 w-full bg-primary text-white'>Enroll for free</LoadingButton>}
        </div>
        </div>
      </div>
     <Details data={data}/>
    </div>:<PlaseLogin/>}
    </div>
    
  )
}
