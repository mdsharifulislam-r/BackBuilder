"use server"
import jwt from 'jwt-simple'
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
        return data
    } catch (error) {
        console.log(error);
        
    }
}