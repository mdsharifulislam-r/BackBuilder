import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../Store";

import toast from "react-hot-toast";
import { getStorLocal, setStorLocal } from "@/lib/hooks/LoacalHooks";
export interface cartItem{
    cartId:string,
    name:string,
    author:string,
    _id:string,
    price:string,
    amount?:number,
    image:string,
    type:string
}
interface initial{
    cartData:cartItem[],
    address:string
}

const localData:cartItem[]= getStorLocal("cartData")
const tempAddress:string= getStorLocal("tempAddress")

const initialState:initial = {
    cartData:localData,
    address : tempAddress
}

export const CartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addCartData:(state,action)=>{
            const data:cartItem = action.payload
            if(!state.cartData.some(item=>item._id==data._id)){
            state.cartData = [action.payload,...state.cartData]
            localStorage.setItem('cartData',JSON.stringify(state.cartData))
            toast.success("Add to cart successfully")
            }else{
               toast.error('data already in cart') 
            }
            
        },
        deleteCartData:(state,action)=>{
            const id = action.payload
            state.cartData= state.cartData.filter(data=>data.cartId!==id)
            localStorage.setItem('cartData',JSON.stringify(state.cartData))
        },
        updateCartData:(state,action)=>{
            const item:{cartId:string,amount:number} = action.payload
            const index = state.cartData.findIndex(jem=>jem.cartId == item.cartId)
            const data = [...state.cartData]
            data[index]={
                ...data[index],
                amount:item.amount
            }
            state.cartData = data
            localStorage.setItem('cartData',JSON.stringify(state.cartData))
        },
        clearCart:(state)=>{
            state.cartData = []
            setStorLocal('cartData',state.cartData)
        },
        setTempAddress:(state,action)=>{
            state.address=action.payload
            setStorLocal('tempAddress',state.address)
        }
    }
})
export const selectCart = (state:RootState)=>state.cartReduicer
export const {addCartData,deleteCartData,updateCartData,clearCart,setTempAddress} = CartSlice.actions