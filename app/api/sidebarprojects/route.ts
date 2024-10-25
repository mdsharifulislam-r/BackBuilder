import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import JWT from "jwt-simple"
import { pool } from "@/lib/DB/pool";
export async function GET() {
    try {
        const token = cookies().get('token')?.value
        
       
        
        
        if(!token){
            return NextResponse.json({
                success:false,
                message:"token expired"
            })
        }
        const id = JWT.decode(token,process.env.JWT_SECRET!)
       
        
        const sql = 'SELECT project_id,project_name FROM `projects` WHERE user_id =?'
        const [rows]:any = await pool.query(sql,[id])
        const items:{project_id:number,project_name:string}[] = rows
        const sql2 = 'SELECT * FROM `endpoints`'
        const [datas]:any=await pool.query(sql2)
        const data:{primary_id:number,name:string,project_id:number}[] = datas
        const itemData = items.map(item=>{
            const endpoints = data.filter(it=>it.project_id==item.project_id)
            return{
                ...item,
                endpoints:endpoints
            }
        })  
       
              
        return NextResponse.json({
            success:true,
            message:'Data get Successfully',
          data:itemData
           
        })
    } catch (error) {
        
        
        return NextResponse.json({
            success:false,
            message:"Something went wrong"
        },{
            status:500
        })
    }
}