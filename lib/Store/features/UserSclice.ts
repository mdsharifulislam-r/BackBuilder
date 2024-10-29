import { getStorLocal, setStorLocal } from "@/lib/hooks/LoacalHooks"
import { UserType } from "@/lib/Types/types"

import { createSlice } from "@reduxjs/toolkit"

const localData:UserType|null = getStorLocal("user")
const TempData:UserType|null = getStorLocal("tempUser")



const initialState = {
    user:localData,
    tempUser:TempData
}

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        signInUser:(state,action)=>{
            state.user = action.payload
            setStorLocal('user',action.payload)
        },
        Logout:(state)=>{
            state.user=null
            setStorLocal('user',null)
        },
        setTempData:(state,action)=>{
            state.tempUser=action.payload
            setStorLocal('tempUser',action.payload)
        }
       

    }
})

export const {signInUser,Logout,setTempData} = userSlice.actions
