import { pool } from "@/lib/DB/pool";
import { Cookie } from "next/font/google";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import JWT from "jwt-simple"
export async function GET(Request:Request,{params}:{params:{id:string}}) {
    try {
        const {id}=params
        if(!id){
            return NextResponse.json({
                success:false,
                message:"invalid credintials"
            })
        }
        const token = cookies().get("token")?.value
        console.log(token);
        const user_id = JWT.decode(token!,process.env.JWT_SECRET!)
        
        
        const sql = 'SELECT * FROM `projects` WHERE user_id=? AND project_id=?'
        const [rows]:any=await pool.query(sql,[user_id,id])
        if(rows){
            return NextResponse.json({
                success:true,
                message:"Data get successfully",
                data:rows[0]
            })
        }else{
            return NextResponse.json({
                success:false,
                message:"data get unsuccessfull"
            })
        }

        
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"Something went wrong"
        })
    }
}