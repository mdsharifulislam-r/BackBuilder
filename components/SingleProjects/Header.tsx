'use client'
import Image from "next/image";
import React, { useEffect, useState } from "react";
import pic from "@/assets/images/console.png";
import LoadingButton from "../common/button/Button";
import { useAppSelector } from "@/lib/hooks/hooks";
import { ProjectType } from "@/lib/Types/types";
import toast from "react-hot-toast";
import {useCookies} from "next-client-cookies"
import JWT from "jwt-simple"
import DeleteBox from "./DeleteBox";
import { RxCross1 } from "react-icons/rx";
export default function Header({project_id}:{project_id:number}) {
  
  
const [project,setProject]=useState<ProjectType>()
const [show,setShow]=useState(false)
const [domain,setDomain]=useState("")
const [finish,setFinish]=useState(false)
const addDomain = async () =>{
  if(!domain){
    toast.error("Fill Domain")
    return
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/projects/${project_id}`,{
    method:"POST",
    body:JSON.stringify({
      domain
    })
  })
  const data = await res.json()
  if(data.success){
    setDomain("")
    toast.success(data.message)
    setFinish(!finish)
  }else{
    toast.error(data?.message)
  }
}
useEffect(()=>{
fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/projects/${project_id}`)
  .then(res=>res.json())
  .then(data=>{
    if(data.success){
      setProject(data.data)
    }else{
      toast.error(data.message)
    }
  })
},[finish])

async function deleteDomain(domain:string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/projects/${project_id}`,{
    method:"PUT",
    body:JSON.stringify({
      domain
    })
  })
  const data = await res.json()
  if(data.success){
   
    toast.success(data.message)
    setFinish(!finish)
  }else{
    toast.error(data?.message)
  }
}
   return (
    <div className="flex place-items-center pb-7">
      <div className="textBox w-full md:w-1/2">
        <h1 className="text-4xl font-bold text-blue-600">
          Projects <span className="text-orange">{project?.project_name}</span>
        </h1>
        <span className="text-sm font-extralight">
      {project?.description||""}
        </span><br />
        <div className="flex flex-col pt-3 pb-1">
          <label htmlFor="">Specify your Domain(optional)</label>
        <input onChange={(e)=>setDomain(e.target.value)} type="url" value={domain} className="px-3 py-2 my-1 rounded-md focus:outline-none focus:shadow-lg" placeholder="Example localhost:3000 or www.example.com" />
        <button onClick={addDomain} className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md w-fit my-2">Add Domain</button>
        </div>
        <div className="pb-3">
          {
            project?.origins?.split(",")?.map(item=>(
              <div key={item}  className="w-full flex justify-between place-items-center text-slate-500 rounded-md  bg-white px-2 py-1"><span>{item}</span> <span className="cursor-pointer" onClick={()=>deleteDomain(item)}><RxCross1/></span></div>
            ))
          }
        </div>
       {show? <DeleteBox name={project?.project_name||""} setShow={setShow}/>:""}
        <div className="flex place-items-center gap-3">
          <button className="px-3 p-1 bg-blue-600 text-white rounded-md">Change Name</button>
          <button onClick={()=>setShow(prev=>!prev)} className="px-3 p-1 bg-red-600 text-white rounded-md">Delete Project</button>
        </div>
      </div>
      <div className="imageBox w-[40%] hidden md:block">
        <Image src={pic} alt="" />
      </div>
    </div>
  );
}
