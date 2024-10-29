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
    <div className="flex place-items-center">
      <div className="textBox md:w-1/2 w-full">
        <h1 className="text-4xl font-bold text-blue-600">
          Endpoint <span className="text-orange">/{name}</span>
        </h1>
        <span className="text-sm font-extralight block py-2">
          you can access all the method by hit this end points . you can do post get put or delete method by the endpoint.
        </span>
       <div className="w-full bg-white py-3 rounded-md px-3 text-blue-600 font-light flex justify-between place-items-center">
       <span>
       {
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/${user_id}/${project_id}/${name}`
        }
        </span> 
        <span className="text-slate-400 cursor-pointer" onClick={copySomeThing}>
          <FaRegClipboard/>
        </span>
       </div>
       <SchemaTable/>
        <div className="my-3 flex gap-2 place-items-center">
          <button onClick={()=>setShow(prev=>!prev)} className="flex place-items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-md">
            <span>
              <CiSettings/>
            </span>
            <span>
              Configure
            </span>
          </button>
          <button onClick={()=>setDeleteShow(!deleteShow)} className="flex place-items-center gap-1 bg-red-600 text-white px-3 py-1 rounded-md">
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
      <div className="imageBox w-[40%] md:block hidden">
        <Image src={pic} alt="" />
      </div>
    </div>
  );
}
