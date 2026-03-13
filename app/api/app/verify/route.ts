import { pool } from "@/lib/DB/pool";
import { MyResponse } from "@/lib/helper/MyResponse";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(Request:NextRequest) {
    try {
       const token = Request.nextUrl.searchParams?.get('token')
        if(!token){
            return MyResponse({success:false,message:"Unauthorized request"},401)
        }
        const [client_id,client_secret]=token.split(':')
        if(!client_id || !client_secret){
            return MyResponse({success:false,message:"Unauthorized request"},401)
        }
        const [rows]:any = await pool.execute('SELECT * FROM `apps` WHERE client_id=? AND client_secret=?', [client_id,client_secret])
        if(!rows?.length){
            return MyResponse({success:false,message:"Unauthorized request"},401)
        }
        const baseUrlwithourAPi = process.env.BASE_URL?.replace('/api','')
        return NextResponse.redirect(`${baseUrlwithourAPi}/authorize?token=${client_id}`)
        
    } catch (error) {
        console.log(error);
        
        return MyResponse({success:false,message:"Something went wrong"},500)
    }

}