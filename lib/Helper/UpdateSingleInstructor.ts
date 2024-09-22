"use server"
import { revalidateTag } from "next/cache";
import { InstructorType } from "../Types/Types";
import jwt from 'jwt-simple'

export async function UpdateSingleInstructor(data:any,id:string){
    try{
      const mainData =  (data.intrestTypes &&  data.intrestTypes.includes(","))?{
        ...data,
        _id:id,
        intrestTypes:data.intrestTypes.split(","),
        secret:"my-web"
      }:{
        ...data,
        _id:id,
        secret:"my-web"
      }
        
        const encode = jwt.encode(mainData,process.env.JWT_SECRET||"")
        const res = await fetch(`${process.env.BASE_URL}/instructor`,{
            method:"PUT",
        
            body:JSON.stringify({
                payload:encode
            })
        })
        const datak = await res.json()
        
        
        if(datak.isOk){
            
            revalidateTag("AllInstructorTag")
            revalidateTag("updateInstructor")
            return{
                isOk:true,
                message:datak.message
            }
        }else{
            return {
                isOk:false,
                message:datak.message
            }
        }
    
    }catch(err){
        console.log(err);
        return {}
        
    }


    
}