"use client"
import LoadingButton from '@/components/Common/Button/Button';
import InputBox from '@/components/Common/InputBox'
import React, { useState } from 'react'
import { FaPlus, FaSubscript, FaVideo } from 'react-icons/fa';
import { MdOutlineSubtitles } from "react-icons/md";
import VideoForm from './VideoForm';
import { ModuleLinkPropsType, ModulePropsType } from '@/components/SingleCourseDetails/Curriculum/Module';
import { CourseType } from '@/components/Courses/CourseCard/CourseCard';
import { getSingleCourse } from '@/lib/Helper/getSingleCourse';
import { updateCourse } from '@/lib/Helper/UpdateCourse';
import toast from 'react-hot-toast';
import { courseStatus } from './ModuleUpdate';
export default function ModuleForm({courseId}:{courseId:string}) {

    
    const [index,setindex]=useState(1)
    const [data,setData]=useState<ModuleLinkPropsType[]>([])
 async function Submidata(e:FormData) {
    if(!data.length){
        toast.error("plese import some video data")
        return
    }
    const course:CourseType = await getSingleCourse(courseId,true)
    const datak = Object.fromEntries(e.entries())
    const dataModule= {
        title:datak.title,
        data:data,
        moduleId:Math.floor(Math.random()*10000000).toString()
    }
    const obj ={
        module:course?.module?.length?[...course?.module,dataModule]:[dataModule]
    }
    const res = await updateCourse(obj,courseId,true)
    if(res.isOk){
        setData([])
        setindex(1)
        courseStatus()
        toast.success(res.message)
    }else{
        toast.error(res.message)
    }
 }
    
  return (
    <div className='w-full'>
     <input type="checkbox" className=' hidden peer/ifshow' name="" id="moduleform" />
     <div className="fixed left-0 top-0 peer-checked/ifshow:flex w-full h-screen bg-[rgba(0,0,0,0.3)] hidden justify-center place-items-center">
        <form action={Submidata} className="p-4 bg-white w-[90%] md:w-[40%] rounded-md relative z-10">
            <div className='text-primary text-xl font-semibold pb-2 '>
                <span className='text-secondary'>Module </span>Form
            </div>
            <InputBox
            icon={<MdOutlineSubtitles/>}
            name='title'
            placeholder='Enter Module title'
            required
            />
       <VideoForm index={index} setIndex={setindex} courseId={courseId} sendData={setData}/>
         <LoadingButton className='flex justify-center py-2 bg-primary text-white rounded-md w-full'>Submit Module</LoadingButton>
        </form>
        <label htmlFor="moduleform" className=' absolute w-full h-full top-0 left-0 z-0 cursor-pointer'></label>
     </div>

    </div>
  )
}
