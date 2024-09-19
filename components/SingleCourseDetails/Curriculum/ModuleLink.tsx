"use client"

import { useAppDispatch, useAppSelector } from "@/lib/hooks/Hooks";
import { ModuleLinkPropsType } from "./Module";
import { BsPlayCircle } from "react-icons/bs";
import Link from "next/link";
import { IoIosEye, IoMdLock } from "react-icons/io";
import { useEffect, useState } from "react";
import { getSingleCourse } from "@/lib/Helper/getSingleCourse";
import { CourseType } from "@/components/Courses/CourseCard/CourseCard";
import { FaCheck, FaTrash } from "react-icons/fa";
import VideoDelete from "@/components/CourseUpdateForm/ModuleUpdate/Delete/DeleteVideo";
import { Student } from "@/lib/Types/Types";
import { getStudentClient } from "@/lib/Helper/getStudentClient";
import { setModuleData } from "@/lib/Store/features/UserSclice";
let videStatus=false
export const ChangeVideoStatus = () => {
  videStatus= !videStatus
}
export default function ModuleLink({ text, isLock = true,courseId,videoId,moduleId,dev=false }: ModuleLinkPropsType) {

    const user = useAppSelector(state=>state.userReduicer.user)

    const [course,setCourse]=useState<CourseType | null>(null)
    const [liveUser,setLiveUser]=useState<Student | null>(null)
    useEffect(()=>{
        getSingleCourse(courseId||"",true)
            .then(res=>setCourse(res))
        getStudentClient([],user?._id)
        .then(student=>setLiveUser(student))
    },[videStatus])
    
    const isEnroll = course?.courseStudents ? course?.courseStudents?.includes(user?._id||"") :false
    const isComplete = liveUser?.completeVideos?.length ? liveUser?.completeVideos?.includes(videoId||""):false
    const dispatch = useAppDispatch()
    function setValue(){
      if(isEnroll ||  moduleId=='promo_module'){
        dispatch(setModuleData({
          courseId,
          moduleId,
          videoId
        }))
      }
    }
    return (
      <div className="">
        <div className="flex justify-between place-items-center">
        <div  onClick={setValue} className="flex place-items-center gap-3 text-sm cursor-pointer transition-all duration-300 hover:text-primary">
          <BsPlayCircle className="text-xl text-secondary" />
          <Link href={isEnroll || moduleId=='promo_module' || dev ?`/courses/${courseId}/lessons}`:""}>{text}</Link>
        </div>
      {!dev ? <> {isEnroll || moduleId=='promo_module' ? (
          <div className="flex place-items-center gap-2">
              {isComplete && <span className="p-1 text-xs bg-primary text-white rounded-full"><FaCheck/></span>}
          </div>
        ) : (
          <div>
            <IoMdLock />
          </div>
        )}</>:<>
         <label htmlFor={videoId+"delete"} className="text-sm text-secondary cursor-pointer"><FaTrash/></label> 
        </>}
        </div>
     <VideoDelete courseId={courseId||""} moduleId={moduleId||""} videoId={videoId||""}/>
      </div>
    );
  }