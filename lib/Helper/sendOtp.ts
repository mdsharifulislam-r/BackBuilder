import jwt from 'jwt-simple'
export async function sendOtp(email:string,client?:boolean) {
    const url =!client ? process.env.BASE_URL :  process.env.NEXT_PUBLIC_BASE_URL
    const secret = !client ? process.env.JWT_SECRET :  process.env.NEXT_PUBLIC_JWT_SECRET
    const payload = jwt.encode({
   
        email
    },secret!)

    const res = await fetch(`${url}/sendotp`,{
        method:"POST",
        body:JSON.stringify({
            payload:payload
        })

    })
    const data = await res.json()
    return data
}