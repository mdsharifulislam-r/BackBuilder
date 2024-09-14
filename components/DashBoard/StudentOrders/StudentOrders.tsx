'use client'
import OrderItem from './OrderItem'
import { getSingleUserOrders } from '@/lib/Helper/getSingleUserOrders'
import { OrderType } from '@/lib/Types/Types'
import { useServerInsertedHTML } from 'next/navigation'
import DataNotFound from '@/components/Common/DataNotFound/DataNotFound'
import { useEffect, useState } from 'react'
import OrderDetailsContainer from '@/components/OrderDetails/OrderDetailsContainer'
import { FaGreaterThan, FaLocationArrow } from 'react-icons/fa'
let check = false
export const changeSingleOrders = ()=> {
    check=!check
}
export default  function StudentOrders({id}:{id:string}) {
    const [orders,setOrders]=useState<OrderType[]>([])
    useEffect(()=>{
        getSingleUserOrders(id)
            .then(res=>setOrders(res))
    },[check])
    const [orderId,setOrderId]=useState("")
    const [orderItem,setOrderItem]=useState<OrderType| undefined>()
    useEffect(()=>{
        if(orderId){
            const order = orders?.find(data=>data._id == orderId)
            setOrderItem(order)
        }
    },[orderId])
    const orderData = orders?.map(order=>{
        return <OrderItem
        userId={order?.userId}
        _id={order._id}
        price={order.price}
        status={order.status}
        orderDate={order.orderDate}
        orders={order.orders}
        address={order.address}
        key={order._id}
        orderId={order.orderId}
        setOrderId={setOrderId}
        />
    })
    
  return (
    <>
{orderId && <div className='flex place-items-center text-primary gap-2 py-3'> <button onClick={()=>setOrderId("")}>Orders </button><FaGreaterThan/> #{orderItem?.orderId}</div>}
{!orderId ? <>
    {!orders?.length  ? <DataNotFound title='Your Order is empty'
    desc='you have to order something first please order something and learn more'
    link='/book'
    LinkText='Order Semething'
    />
    :<div className="w-full mt-5 popUp  mx-auto bg-white shadow-lg rounded-md border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-800">Reviews of My Courses</h2>
            </header>
            <div className="p-3">
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                            <tr>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Order Id</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Amount</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Date</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Address</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Status</div>
                                
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Action</div>
                                
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Details</div>
                                
                                </th>
                             
                             
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-gray-100">
                      {orderData}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>}
        </>:
    <OrderDetailsContainer order={orderItem}/>}
        </>
  )
}
