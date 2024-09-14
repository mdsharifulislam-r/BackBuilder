"use server"
import jwt from "jwt-simple"
import { revalidateTag } from "next/cache"
export async function cencelOrder(orderId:string) {
    try {
    const id = jwt.encode(orderId,process.env.JWT_SECRET!)
    const res =await fetch(`${process.env.BASE_URL}/order/${id}`,{
        method:"DELETE"
    })
    revalidateTag("singleOrder")
    return await res.json()
    } catch (error) {
        return {
            isOk:false
        }
    }
}