import jwt from 'jwt-simple'
export async function verifyOtp(email:string,otp:string,client?:boolean) {
    try {
        const url =!client ? process.env.BASE_URL :  process.env.NEXT_PUBLIC_BASE_URL
        const secret = !client ? process.env.JWT_SECRET :  process.env.NEXT_PUBLIC_JWT_SECRET
        const payload = jwt.encode({
            otp,
            email
        },secret!)
    
        const res = await fetch(`${url}/sendotp`,{
            method:"PUT",
            body:JSON.stringify({
                payload:payload
            })
    
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error);
        return {
            isOk:false,
            massage:"Something went wrong"
        }
    }

}