
import { pool } from "@/lib/DB/pool";
import { MyResponse } from "@/lib/helper/MyResponse";
import { validateUser } from "@/lib/helper/tokenValidate";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(Request:Request,{params}:{params:{id:string}}) {
    try {
        const sql = 'SELECT * FROM `apps` WHERE client_id=?'
        const [rows]:any = await pool.execute(sql,[params.id])
        const user_id = validateUser()

        const token = cookies().get('token')?.value

        
        
        if(!user_id){
            return MyResponse({success:false,message:"Token expired please re login"},400)
        }
        const [userinfo]:any = await pool.execute('SELECT * FROM `users` WHERE user_id=?',[user_id])
        
        if(!userinfo[0]?.user_id){
            return MyResponse({success:false,message:"User not found"},404)
        }
        if(!rows[0]?.app_id){
            return MyResponse({success:false,message:"App not found"},404)
        }
        return NextResponse.json({success:true,data:{
            app:{
                name:rows[0].app_name,
                app_id:rows[0].app_id,
                image:rows[0].image,
                description:rows[0].description
            },
            user:{
                name:userinfo[0].name,
                user_id:userinfo[0].user_id
            }
        },message:"Data get successfully"})
    } catch (error) {
        console.log(error);
        
        return MyResponse({success:false,message:"Something went wrong"},500)
    }

}

export async function POST(Request:Request,{params}:{params:{id:string}}){
    try {
        const user_id = validateUser()
        if(!user_id){
            return MyResponse({success:false,message:"Token expired please re login"},400)
        }
        const [rows]:any = await pool.execute('SELECT * FROM `apps` WHERE app_id=? AND user_id=?',[params.id,user_id])
        const appInfo = rows[0]
        if(!appInfo?.app_id){
            return MyResponse({success:false,message:"App not found"},404)
        }
        const [userinfo]:any = await pool.execute('SELECT * FROM `users` WHERE user_id=?',[user_id])
        if(!userinfo[0]?.user_id){
            return MyResponse({success:false,message:"User not found"},404)
        }
        const token = cookies().get('token')?.value
        await fetch(`${appInfo?.authorize_redirect_url}`,{
            method:'POST',
            body:JSON.stringify({
                user:{
                    name:userinfo[0].name,
                    email:userinfo[0].email,
                    user_id:userinfo[0].user_id
                },
                token:token
            })
            
        })
        return NextResponse.json({success:true,data:{
            user:{
                name:userinfo[0].name,
                user_id:userinfo[0].user_id
            },
            token:token,
            url:appInfo?.authorize_redirect_url
        },message:"Data get successfully"})
    } catch (error) {
        console.log(error);
        
        return MyResponse({success:false,message:"Something went wrong"},500)
    }
}