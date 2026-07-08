'use client'
import Image from "next/image";
import React, { Suspense, useEffect, useState } from "react";
import pic from "@/assets/images/console.png";
import LoadingButton from "../common/button/Button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { ProjectType } from "@/lib/Types/types";
import toast from "react-hot-toast";
import {useCookies} from "next-client-cookies"
import JWT from "jwt-simple"
import copy from 'clipboard-copy'
import { FaRegClipboard } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { changeDataChange } from "@/lib/Store/features/CartSlice";
import { useRouter } from "next/navigation";

export default function Header({name}:{name:string}) {
  
  const cookie = useCookies()
  const token = cookie.get('token')
 
  const router = useRouter()
  useEffect(()=>{
    if(!token){
      router.push('/')
      
    }
  },[token])
  
  const user_id = JWT.decode(token||"",process.env.NEXT_PUBLIC_JWT_SECRET!)
  const project_id = useAppSelector(state=>state.cartReduicer.project_id)
const id = isNaN(project_id!)?1:project_id
  const copySomeThing = async ()=>{
    try {
      await copy(`${process.env.NEXT_PUBLIC_BASE_URL}/user/${user_id}/${id}/${name}`)
      toast.success('URL copy successfully')
    } catch (error) {
  
      
    }
   }
   const dispatch = useAppDispatch()
  const [hydred,setHydred]=useState(false)
  useEffect(()=>{
    setHydred(true)
  },[])
  return (
    <>
   
    <div className="flex place-items-center bg-white border border-line rounded-2xl shadow-card p-6 md:p-8">
      <div className="textBox w-full md:w-2/3">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">
          Table <span className="text-orange">/{name}</span>
        </h1>
        <span className="text-sm text-muted block py-2">
          Browse and manage the raw rows stored for this endpoint&apos;s table.
        </span>
      {hydred && <div className="w-full bg-slate-50 border border-line py-3 rounded-lg px-3 text-primary text-sm font-mono flex justify-between place-items-center gap-2 overflow-x-auto scroll-thin">
       <span className="whitespace-nowrap">
       {
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/${user_id}/${id}/${name}`
        }
        </span> 
        <span className="text-slate-400 hover:text-primary cursor-pointer transition-colors shrink-0" onClick={copySomeThing}>
          <FaRegClipboard/>
        </span>
       </div>}
  
     
      </div>
  
      <div className="imageBox w-[35%] md:block hidden">
        <Image src={pic} alt="" />
      </div>
    </div>
    <div className="flex justify-end w-full mt-4">
        <button onClick={()=>dispatch(changeDataChange())} className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors" >Refresh</button>
      </div>
    </>
  );
}
