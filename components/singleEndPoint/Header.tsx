'use client'
import Image from "next/image";
import React, { Suspense, useEffect, useState } from "react";
import pic from "@/assets/images/console.png";
import LoadingButton from "../common/button/Button";
import { useAppSelector } from "@/lib/hooks/hooks";
import { ProjectType } from "@/lib/Types/types";
import toast from "react-hot-toast";
import {useCookies} from "next-client-cookies"
import JWT from "jwt-simple"
import copy from 'clipboard-copy'
import { FaRegClipboard } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import SchemaTable from "./Table/SchemaTable";
import PopUp from "./PopUp/PopUp";
import DeletePopUp from "./DeletePopUp/DeletePopUp";
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

  const user_id = JWT.decode(token||"",process.env.NEXT_PUBLIC_JWT_SECRET!)
  const project_id = useAppSelector(state=>state.cartReduicer.project_id)
  const endpoint_id = useAppSelector(state=>state.cartReduicer.endpoint_id)
  const copySomeThing = async ()=>{
    try {
      await copy(`${process.env.NEXT_PUBLIC_BASE_URL}/user/${user_id}/${project_id}/${name}`)
      toast.success('URL copy successfully')
    } catch (error) {
      console.log(error);
      
    }
   }

   const [show,setShow]=useState(false)
   const [deleteShow,setDeleteShow]=useState(false)
  return (
    <div className="flex place-items-center bg-white border border-line rounded-2xl shadow-card p-6 md:p-8">
      <div className="textBox md:w-2/3 w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">
          Endpoint <span className="text-orange">/{name}</span>
        </h1>
        <span className="text-sm text-muted block py-2">
          Call this endpoint with GET, POST, PUT or DELETE requests to work with this table&apos;s data.
        </span>
       <div className="w-full bg-slate-50 border border-line py-3 rounded-lg px-3 text-primary text-sm font-mono flex justify-between place-items-center gap-2 overflow-x-auto scroll-thin">
       <span className="whitespace-nowrap">
       {
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/${user_id}/${project_id}/${name}`
        }
        </span> 
        <span className="text-slate-400 hover:text-primary cursor-pointer transition-colors shrink-0" onClick={copySomeThing}>
          <FaRegClipboard/>
        </span>
       </div>
       <SchemaTable/>
        <div className="my-3 flex gap-2 place-items-center">
          <button onClick={()=>setShow(prev=>!prev)} className="flex place-items-center gap-1.5 bg-primary text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors">
            <span>
              <CiSettings/>
            </span>
            <span>
              Configure
            </span>
          </button>
          <button onClick={()=>setDeleteShow(!deleteShow)} className="flex place-items-center gap-1.5 bg-red-600 text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-red-700 transition-colors">
            <span>
              <RxCross1/>
            </span>
            <span>
              Delete
            </span>
          </button>
        </div>
      </div>
      {
        show?<Suspense fallback={"Loading..."}><PopUp endpoint_name={name} setShow={setShow}/></Suspense>:""
      }
      {
        deleteShow? <DeletePopUp name={name} setHide={setDeleteShow}/>:""
}
      <div className="imageBox w-[35%] md:block hidden">
        <Image src={pic} alt="" />
      </div>
    </div>
  );
}
