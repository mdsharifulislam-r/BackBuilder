"use server"
import { revalidateTag } from "next/cache";
import { BlogType } from "../Types/Types";

export async function createBlog(obj:BlogType){
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blog`,{
            method:"POST",
            body:JSON.stringify(obj)
        })
        const data = await res.json()
        revalidateTag('blogs')
        return data
    } catch (error) {
        console.log(error);
        return {
            isOk:false,
            message:"seomthing went wrong"
        }
        
    }

}