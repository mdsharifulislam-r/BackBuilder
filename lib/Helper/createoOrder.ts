"use server"
import jwt from 'jwt-simple'
import { revalidateTag } from 'next/cache'
export async function createOrder(obj:any) {
    try {
        const payload = jwt.encode(obj,process.env.JWT_SECRET!)
        const res = await fetch(`${process.env.BASE_URL}/order`,{
            method:"POST",
            body:JSON.stringify({
                payload
            })
        })
        const data = await res.json()
        if(data?.isOk){
            revalidateTag("singleOrder")
        }
        return data
    } catch (error) {
        console.log(error);
        
    }
}