'use server'
import { cookies } from "next/headers"

export async function getProjects(){
    
try {
    const token = cookies().get("token")?.value
    
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/projects`,{
        headers:{
            "Cookie":`token=${token}`
        }
    })
    const data = await res.json()
    return data
} catch (error) {
    return []
}
}