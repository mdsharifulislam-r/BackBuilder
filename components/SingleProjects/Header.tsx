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
export default function Header({project_id}:{project_id:number}) {
  
  
const [project,setProject]=useState<ProjectType>()
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
},[])
   return (
    <div className="flex place-items-center">
      <div className="textBox w-1/2">
        <h1 className="text-4xl font-bold text-blue-600">
          Projects <span className="text-orange">{project?.project_name}</span>
        </h1>
        <span className="text-sm font-extralight">
      {project?.description||""}
        </span><br />
        <div className="flex flex-col py-3">
          <label htmlFor="">Specify your Domain(optional)</label>
        <input type="url" className="px-3 py-2 my-1 rounded-md focus:outline-none focus:shadow-lg" placeholder="Example localhost:3000 or www.example.com" />
        <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md w-fit my-2">Add Domain</button>
        </div>
  
        
      </div>
      <div className="imageBox w-[40%]">
        <Image src={pic} alt="" />
      </div>
    </div>
  );
}
