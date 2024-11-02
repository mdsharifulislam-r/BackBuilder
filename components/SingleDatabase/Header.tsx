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
  },[])
  if(!token){
    router.push('/')
    return <></>
  }
  const user_id = JWT.decode(token||"",process.env.NEXT_PUBLIC_JWT_SECRET!)
  const project_id = useAppSelector(state=>state.cartReduicer.project_id)
const id = isNaN(project_id!)?1:project_id
  const copySomeThing = async ()=>{
    try {
      await copy(`${process.env.NEXT_PUBLIC_BASE_URL}/user/${user_id}/${id}/${name}`)
      toast.success('URL copy successfully')
    } catch (error) {
      console.log(error);
      
    }
   }
   const dispatch = useAppDispatch()
  const [hydred,setHydred]=useState(false)
  useEffect(()=>{
    setHydred(true)
  },[])
  return (
    <>
   
    <div className="flex place-items-center">
      <div className="textBox w-full md:w-1/2">
        <h1 className="text-4xl font-bold text-blue-600">
          Endpoint <span className="text-orange">/{name}</span>
        </h1>
        <span className="text-sm font-extralight block py-2">
          you can access all the method by hit this end points . you can do post get put or delete method by the endpoint.
        </span>
      {hydred && <div className="w-full bg-slate-100 py-3 rounded-md px-3 text-blue-600 font-light flex justify-between place-items-center">
       <span>
       {
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/${user_id}/${id}/${name}`
        }
        </span> 
        <span className="text-slate-400 cursor-pointer" onClick={copySomeThing}>
          <FaRegClipboard/>
        </span>
       </div>}
  
     
      </div>
  
      <div className="imageBox w-[40%] md:block hidden">
        <Image src={pic} alt="" />
      </div>
    </div>
    <div className="justify-end w-full">
        <button onClick={()=>dispatch(changeDataChange())} className="px-3 py-1 bg-blue-600 text-white" >Refresh</button>
      </div>
    </>
  );
}
