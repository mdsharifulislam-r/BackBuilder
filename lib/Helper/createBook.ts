"use server"
import jwt from "jwt-simple"
import { revalidateTag } from "next/cache"
export async function createBooks(body:any,client:boolean=false) {
    try {
        const url = client ? process.env.NEXT_PUBLIC_BASE_URL : process.env.BASE_URL
        const jwt_URL = client ?process.env.NEXT_PUBLIC_JWT_SECRET:process.env.JWT_SECRET
        const payload = jwt.encode(body,jwt_URL!)
        const res = fetch(`${url}/book`,{
            method:"POST",
            body:JSON.stringify({
                payload
            })
        })
        revalidateTag("allbooks")
        return (await res).json()
    } catch (error) {
        console.log(error);
        
    }
}