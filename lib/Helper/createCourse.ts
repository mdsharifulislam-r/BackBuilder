"use server"
import jwt from 'jwt-simple'
import { CourseType } from "@/components/Courses/CourseCard/CourseCard";
import { cookies } from "next/headers";
import { revalidateTag } from 'next/cache';
const token = cookies().get("token")?.value
export async function createCourse(data:any) {
    try{
 
      
        
        const encrptedData = jwt.encode(data,process.env.JWT_SECRET||"")
        const res =await fetch(`${process.env.BASE_URL}/course`,{
            method:"POST",
            headers:{
                "Cookie":`token=${token}`
            },
            body:JSON.stringify({
                payload:encrptedData
            })
        })
        const dat = await res.json()
  
        
        if(dat.isOk){
            revalidateTag("updateInstructor")
            return {
                isOk:true,
                message:dat.message
            }
        }else{
            return {
                isOk:false,
                message:dat.message
            } 
        }
    }catch(error){
        console.log(error);
        return {
            isOk:false,
            message:"Somthing Went wrong"
        }
    }
   
    
    
}