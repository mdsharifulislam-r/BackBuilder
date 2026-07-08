import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../Store";

import toast from "react-hot-toast";
import { getStorLocal, setStorLocal } from "@/lib/hooks/LoacalHooks";

interface initial{
    project_id:number|null,
    endpoint_id:number|null,
    dataChange:boolean,
    is_user:boolean,
    account:boolean|null
}
const project_id:number|null = parseInt(getStorLocal("project_id"))
const endpoint_id:number|null = parseInt(getStorLocal("endpoint_id"))
const account:boolean|null = getStorLocal("account")


const initialState:initial = {
    project_id:project_id,
    endpoint_id:endpoint_id,
    dataChange:false,
    is_user:false,
    account:account
}

export const ProjectSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
      getProjectId:(state,action)=>{
        state.project_id=action.payload
        setStorLocal("project_id",action.payload)
      },
      getEndPointId:(state,action)=>{
        state.endpoint_id=action.payload
        setStorLocal("endpoint_id",action.payload)
      },
      changeDataChange:(state)=>{
        state.dataChange=!state.dataChange
      },
      setIsUser:(state,action)=>{
        state.is_user=action.payload

      },
      setTempAccout:(state,action)=>{
        state.account=action.payload
        setStorLocal("account",action.payload)
      },
    }
})
export const selectCart = (state:RootState)=>state.cartReduicer
export const {getProjectId,getEndPointId,changeDataChange,setIsUser,setTempAccout} = ProjectSlice.actions