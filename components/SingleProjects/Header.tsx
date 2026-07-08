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
    <div className="flex place-items-center pb-8 bg-white border border-line rounded-2xl shadow-card p-6 md:p-8">
      <div className="textBox w-full md:w-2/3">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">
          Project <span className="text-orange">{project?.project_name}</span>
        </h1>
        <span className="text-sm text-muted">
      {project?.description||""}
        </span><br />
        <div className="flex flex-col pt-4 pb-2 max-w-md">
          <label htmlFor="" className="text-sm font-medium text-ink mb-1">Specify your Domain (optional)</label>
        <input onChange={(e)=>setDomain(e.target.value)} type="url" value={domain} className="px-3 py-2.5 my-1 rounded-lg border border-line focus:outline-none focus:border-primary transition-colors" placeholder="Example localhost:3000 or www.example.com" />
        <button onClick={addDomain} className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg w-fit my-2 hover:bg-primary-dark transition-colors">Add Domain</button>
        </div>
        <div className="pb-3 max-w-md space-y-1.5">
          {
            project?.origins?.split(",")?.map(item=>(
              <div key={item}  className="w-full flex justify-between place-items-center text-muted rounded-lg border border-line bg-slate-50 px-3 py-2 text-sm"><span>{item}</span> <span className="cursor-pointer hover:text-secondary transition-colors" onClick={()=>deleteDomain(item)}><RxCross1/></span></div>
            ))
          }
        </div>
       {show? <DeleteBox name={project?.project_name||""} setShow={setShow}/>:""}
        <div className="flex place-items-center gap-3">
          <button className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors">Change Name</button>
          <button onClick={()=>setShow(prev=>!prev)} className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors">Delete Project</button>
        </div>
      </div>
      <div className="imageBox w-[35%] hidden md:block">
        <Image src={pic} alt="" />
      </div>
    </div>
  );
}
