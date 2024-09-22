"use client"
import { getSingleCourse } from "@/lib/Helper/getSingleCourse";
import SendmessageBox from "./SendmessageBox";
import Videoframe from "./Videoframe";
import { CourseType } from "../Courses/CourseCard/CourseCard";
import { ModuleLinkPropsType, ModulePropsType } from "../SingleCourseDetails/Curriculum/Module";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

export interface LessonsProps{
  courseId:string,
  moduleId:string,
  videoId:string
}
export default  function Container({courseId,moduleId,videoId}:LessonsProps) {

  const [course,setCourse]=useState<CourseType>()
  useEffect(()=>{
    getSingleCourse(courseId,true).then(res=>setCourse(res))
  },[])
  const myModule:ModulePropsType[]|undefined = course?.module
  let data:ModuleLinkPropsType | undefined = {courseId,moduleId,videoId,text:""}
  if(!myModule || myModule){
    if(moduleId=="promo_module" && videoId=="promo"){
      data={
        ...data,
        text:"Promo Video",
        videolink:course?.promovideo,
        desc:"This is a promo video"
      }
    }else if(moduleId && videoId){
      const myData:ModulePropsType|undefined = myModule?.filter(item=>item.moduleId==moduleId)[0]
      data = myData?.data?.filter(item=>item.videoId==videoId)[0]
    }
  }
 
  
  return (
    <div className="lg:w-[50%] w-full p-4">
      <div className="header">
        <h1 className="title text-3xl flex justify-center place-items-center py-5 font-semibold border-b">{data?.text}</h1>
     
      </div>
      <Videoframe videoLinks={data?.videolink} videoId={videoId}/>
      <div className=""> <p className="text-slate-600 text-justify text-sm py-3">
         {data?.desc}
        </p></div>
      <SendmessageBox/>
    </div>
  );
}
