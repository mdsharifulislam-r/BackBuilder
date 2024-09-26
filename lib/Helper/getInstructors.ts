'use server'

import { revalidatePath, revalidateTag } from "next/cache";

export async function getInstructors(){
    try{
    const response = await fetch(`${process.env.BASE_URL}/instructor`,{
        next:{
            tags:['AllInstructorTag']
        }
    })
    const instructor = await response.json()
   return instructor?.isOk?[...instructor?.data]:[]
    }catch(err){
        console.log(err);
        
        return []
    }
}

export async function reavalidateInstructor(){
    revalidateTag("AllInstructorTag")
}