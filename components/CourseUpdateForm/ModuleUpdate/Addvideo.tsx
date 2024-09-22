"use client"
import LoadingButton from '@/components/Common/Button/Button'
import InputBox from '@/components/Common/InputBox'
import { CourseType } from '@/components/Courses/CourseCard/CourseCard'
import { ModuleLinkPropsType, ModulePropsType } from '@/components/SingleCourseDetails/Curriculum/Module'
import { getSingleCourse } from '@/lib/Helper/getSingleCourse'
import { updateCourse } from '@/lib/Helper/UpdateCourse'
import React, { ChangeEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { FaPlus, FaSubscript, FaVideo } from 'react-icons/fa'
import { courseStatus } from './ModuleUpdate'

export default function AddVideo({courseId,moduleId}:{courseId:string,moduleId:string}) {
    const [data,setData]=useState<ModuleLinkPropsType[]>([])
    const [index,setIndex]=useState(1)
    function AddVideo(){
        if(!formData.text && !formData.desc && !formData.videolink){
            toast.error("Please filled all data")
            return
        }
        const obj:ModuleLinkPropsType={
            ...formData,
            courseId,
            videoId:Math.floor(Math.random()*10000000).toString(),
       
         
        }
        setData(prev=>[...prev,obj])
        setIndex(prev=>prev+1)
        toast.success("video in queue")
        setFormData({
        text:"",
        desc:"",
        videolink:""
        })
    }
    const [formData,setFormData]=useState({
        text:"",
        desc:"",
        videolink:""
    })
    function AddValue(e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>){
        const {name,value}=e.target

        setFormData({...formData,[name]:value})

    }
    async function SubmitData(){
        const course:CourseType = await getSingleCourse(courseId,true)
        const moduleData:ModulePropsType[]= course?.module?.length? [...course?.module]:[]
        const index = moduleData?.findIndex(data=>data.moduleId==moduleId)
        if(index==undefined){
            toast.error("data not found")
            return
        }
        const prevModule = moduleData[index]
        const newModule= {
            ...prevModule,
            data:prevModule?.data?.length ? [...prevModule?.data,...data]:data
        }
        moduleData[index]=newModule
        const obj = {
            module:moduleData
        }
        const res = await updateCourse(obj,courseId,true)
        if(res.isOk){
            courseStatus()
            setData([])
            setIndex(1)
            toast.success(res.message)
        }else{
            toast.error(res.message)
        }
        

    }
  return (
    <div className='w-full'>
        <input type="checkbox" name="" id={moduleId} className='peer/addvideo hidden' />
    <div className='fixed w-full hidden  h-screen bg-[rgba(0,0,0,0.3)] top-0 left-0 peer-checked/addvideo:flex justify-center place-items-center'>
    <form action={SubmitData} className='p-5 rounded-md md:w-[40%] w-[80%] bg-white relative z-10'>
    <span className='text-slate-500 text-sm pb-2'>Video {index} information</span>
    <InputBox onChange={AddValue} value={formData.text} type="text" name='text' icon={<FaSubscript/>} placeholder='Video Title'/>
    <InputBox onChange={AddValue} value={formData.videolink} type="text" name='videolink' icon={<FaVideo/>} placeholder='Video Link'/>
    <textarea onChange={AddValue} value={formData.desc} name="desc" id="" className='w-full min-h-20 max-h-32 p-2 border-primary border focus:outline-none  rounded-md' placeholder='Video Description' ></textarea>
    <div>
        <button type='button' onClick={AddVideo} className='flex justify-center place-items-center py-1 gap-2 w-full text-primary'><FaPlus/> Add Video</button>
    </div>
    <div className='py-2'>
    <LoadingButton className='flex justify-center py-2 bg-primary text-white rounded-md w-full'>Submit Video Data</LoadingButton>
    </div>
    </form>
    <label htmlFor={moduleId} className='absolute w-full h-full left-0 top-0 z-0 cursor-pointer'></label>
    </div>

    </div>

  )
}
