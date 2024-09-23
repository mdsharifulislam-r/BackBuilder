"use server"

import { cookies } from "next/headers";
import jwt from 'jwt-simple'

export async function getStudentInfo(word?:string[]|undefined,id?:string) {
    try {
        const token = cookies().get('token')?.value
             
            const path = word?.toString()||'single'
          
            
            const res = await fetch(`${process.env.BASE_URL}/student/${path}`,{
                headers:{
                    "Cookie" : `token=${jwt.encode(id,process.env.JWT_SECRET||"")||token}`
                },
                method:"GET",
                cache:"no-store",
                next:{
                    tags:["getsudents"]
                }
              
            })

            const data = await res.json()  
            if(data.isOk){
                const main = jwt.decode(data.data,process.env.JWT_SECRET||"")
              
                
                return main
                
                
            }else{
                return {}
            }         

        
        
    } catch (error) {
       console.log(error);
    return {}
    }
}