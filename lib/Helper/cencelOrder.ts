"use server"
import jwt from "jwt-simple"
export async function cencelOrder(orderId:string) {
    try {
    const id = jwt.encode(orderId,process.env.JWT_SECRET!)
    const res =await fetch(`${process.env.BASE_URL}/order/${id}`,{
        method:"DELETE"
    })
    return await res.json()
    } catch (error) {
        return {
            isOk:false
        }
    }
}