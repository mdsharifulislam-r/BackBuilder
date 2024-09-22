"use server"
import { cookies } from "next/headers";
import { InstructorType } from "../Types/Types";
import jwt from 'jwt-simple'


export async function UpdateInstructor(formdata:FormData){
    try{
        const token = cookies().get('token')?.value
        const data:InstructorType |any = Object.fromEntries(formdata.entries())
      const mainData =  (data.intrestTypes || data.facebook &&  data.intrestTypes.includes(","))?{
        ...data,
        intrestTypes:data.intrestTypes.split(","),
        socialLinks:{
            facebook:data.facebook,
            github:data.github,
            youtube:data.youtube
        },
        secret:"my-web"
      }:{
        ...data,
        secret:"my-web"
      }

        
        const encode = jwt.encode(mainData,process.env.JWT_SECRET||"")
        const res = await fetch(`${process.env.BASE_URL}/instructor/update`,{
            method:"PUT",
            headers:{
                'Cookie':`token=${token}`
            },
            body:JSON.stringify({
                payload:encode
            })
        })
        const datak = await res.json()
  
        
        if(datak.isOk){
     
            
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