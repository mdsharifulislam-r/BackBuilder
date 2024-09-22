"use client"
import { useAppSelector } from '@/lib/hooks/Hooks'
import LoadingButton from '../Common/Button/Button'
import { InstructorType } from '@/lib/Types/Types'
import { UpdateSingleInstructor } from '@/lib/Helper/UpdateSingleInstructor'
import { getSingleInstructor } from '@/lib/Helper/getSingleInstructor'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'

export default function FollowButton({data}:{data:InstructorType}) {
    const user = useAppSelector(state=>state.userReduicer.user)
    const [students,setStudents]=useState<string[]>([])
    const [loading,setLoading]=useState(false)
    useEffect(()=>{
    getSingleInstructor(data._id,true)
      .then(res=>setStudents(res.students)
      )
    
      
    },[])
    async function Follow() {
      if(!user?.name){
        toast.error("you have to login first")
        return
      }
      const instructor:InstructorType = await getSingleInstructor(data._id,true)
      
        let obj = {
          students:students?.length ?[...students,user?._id]:[user?._id]
        }
        if(instructor?.students.some(id=> id==user?._id)){
          setLoading(true)
          let obj = {
            students:students?.length && students.filter(id=>id!==user?._id)
            
          }
          const res = await UpdateSingleInstructor(obj,data._id)
         
          if(res.isOk){
            setStudents(students.filter(id=>id!==user?._id))
            setLoading(false)
          }
          else{
            setLoading(false)
          }

          return
        }
        setLoading(true)
        const res = await UpdateSingleInstructor(obj,data._id)
        if(res.isOk){
          setStudents([...students,user?._id])
          toast.success(`you are student now of ${instructor?.name}`)
          setLoading(false)
        }else{
          setLoading(false)
        }
        
    }
  return (
    <div className="follow flex gap-3">
    <LoadingButton isLoading={loading} onClick={Follow} className="px-4 py-2 transition-all duration-300 hover:text-primary hover:bg-white hover:outline rounded-md bg-primary text-white">{students?.some(id=>id==user?._id)?"Leave as a Student":"Become a student"}</LoadingButton>
    <button className="px-4 py-2 transition-all duration-300 hover:text-primary hover:bg-white hover:outline rounded-md bg-secondary text-white">message</button>
  </div>
  )
}
