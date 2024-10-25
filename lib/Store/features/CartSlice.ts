import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../Store";

import toast from "react-hot-toast";
import { getStorLocal, setStorLocal } from "@/lib/hooks/LoacalHooks";

interface initial{
    project_id:number|null,
    endpoint_id:number|null
}
const project_id:number|null = parseInt(getStorLocal("project_id"))
const endpoint_id:number|null = parseInt(getStorLocal("endpoint_id"))

const initialState:initial = {
    project_id:project_id,
    endpoint_id:endpoint_id
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
    }
})
export const selectCart = (state:RootState)=>state.cartReduicer
export const {getProjectId,getEndPointId} = ProjectSlice.actions