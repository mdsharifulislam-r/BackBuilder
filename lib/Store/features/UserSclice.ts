import { getStorLocal, setStorLocal } from "@/lib/hooks/LoacalHooks"
import { UserType } from "@/lib/Types/types"

import { createSlice } from "@reduxjs/toolkit"

const localData:UserType|null = getStorLocal("user")

const localModuleData:{
    courseId:string,
    moduleId:string,
    videoId:string
}= getStorLocal("moduleData")

const initialState = {
    user:localData,
   
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
       

    }
})

export const {signInUser,Logout} = userSlice.actions
