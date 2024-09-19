"use client"
import React, { useEffect, useState } from "react";
import Module, { ModuleLinkPropsType, ModulePropsType } from "../SingleCourseDetails/Curriculum/Module";
import SearchBar from "./SearchBar";
import { LessonsProps } from "./Container";
import { CourseType } from "../Courses/CourseCard/CourseCard";
import { getSingleCourse } from "@/lib/Helper/getSingleCourse";


export default async function SideBar({courseId,videoId,moduleId}:LessonsProps){
  const [course,setCourse]=useState<CourseType>()
  useEffect(()=>{
    getSingleCourse(courseId,true).then(res=>setCourse(res))
  },[])
  const myModule:ModulePropsType[] = course?.module?.length? [{
    title:"Promo Video",
    moduleId:"promo_module",
    data:[{
      text:"Promo Video",
      videolink:course?.promovideo,
      isLock:false,
      videoId:'promo',
      desc:"This is the promo video"
    }]
  },...course?.module]:[{
    title:"Promo Video",
    moduleId:"promo_module",
    data:[{
      text:"Promo Video",
      videolink:course?.promovideo,
      isLock:false,
      videoId:'promo',
      desc:"This is the promo video"
    }]
  }]

 
  const data = myModule?.map((item,index)=>{
  
    
    return <Module
    title={item.title}
    data={item.data}
    open={moduleId==item.moduleId}
    key={index}
    courseId={course?._id}
    moduleId={item.moduleId}
    />
  })
  return (
    <>
     <div className="lg:w-1/3 w-full px-3 ">
     <SearchBar/>
     <div>
     </div>
   <div className="flex flex-col gap-2">
   {data}
   </div>
     </div>
    </>
  );
}