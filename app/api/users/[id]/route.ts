import { NextResponse } from "next/server";
import user_data from "@/lib/tempData/user.json"
import { compare, compareSync, hash } from "bcrypt";
import jwt from "jwt-simple"
import { pool } from "@/lib/DB/pool";
import { UserType } from "@/lib/Types/types";
import { validateHeaderValue } from "http";
import { cookies } from "next/headers";
import JWT from 'jwt-simple'
export async function POST(Request:Request) {
    try {
        const {email,password,social_login}:{email:string,password:string,social_login:boolean}=await Request.json()
        if(!social_login){
        if(!email && !password){
            return NextResponse.json({
                success:false,
                message:"Please fill all require field"
            },{
                status:400
            }) 
        }
        const sql = 'SELECT * FROM `users` WHERE email= ?'
        
        const [rows]:any =await pool.query(sql,[email])
       const user =rows[0]
        

        if(!user?.email){
            return NextResponse.json({
                success:false,
                message:"user not found"
            },{
                status:400
            }) 
        }
        const match = compareSync(password,user.password)
        if(!match){
            return NextResponse.json({
                success:false,
                message:"Invalid credintials"
            },{
                status:400
            }) 
        }
        const response = NextResponse.json({
            success:true,
            message:"Successfully Login",
            data:{
                email:user?.email,
                name:user?.name,
                member:user?.member
            }
        })
        const token = jwt.encode(user.user_id,process.env.JWT_SECRET!)
        response.cookies.set('token',token)
        return response
    }else{
        if(!email){
            return NextResponse.json({
                success:false,
                message:"Please fill all require field"
            },{
                status:400
            }) 
        }
        const sql = 'SELECT * FROM `users` WHERE email= ?'
        
        const [rows]:any =await pool.query(sql,[email])
       const user =rows[0]
        

        if(!user?.email){
            return NextResponse.json({
                success:false,
                message:"user not found"
            },{
                status:400
            }) 
        }
        const response = NextResponse.json({
            success:true,
            message:"Successfully Login",
            data:{
                email:user?.email,
                name:user?.name,
                member:user?.member
            }
        })
        const token = jwt.encode(user.user_id,process.env.JWT_SECRET!)
        response.cookies.set('token',token)
        return response
    }
        
        
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({
            success:false,
            message:"Something went wrong"
        },{
            status:500
        })
    }
}

export async function DELETE(Request:Request) {
    try {
        const token = cookies().get('token')?.value
        if(!token){
          return NextResponse.json({
            success:false,
            message:"Token Expired"
          },{
            status:404
          })
        }
        const user_id = JWT.decode(token!,process.env.JWT_SECRET!)
        const [project]:any[] = await pool.query('SELECT project_id FROM projects WHERE user_id = ?',[user_id])

        if(project?.length){
            const items:{project_id:number}[] = project
            items?.forEach(async item=>{
                await fetch(`${process.env.BASE_URL}/projects/${item?.project_id}`,{
                    method:"DELETE"
                })
            })
        }
        await pool.query('DELETE FROM users WHERE user_id=?',[user_id])
        cookies().delete('token')
        return NextResponse.json({
            success:true,
            message:"Account Deleted Successfully"
        })
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success:false,
            message:"Something went wrong"
        },{
            status:500
        })
        
    }
}
export async function PUT(Request:Request) {
    try {
        const {newPassword,oldPassword}:{newPassword:string,oldPassword:string}= await Request.json()
        const token = cookies().get('token')?.value
    if(!token){
      return NextResponse.json({
        success:false,
        message:"Token Expired"
      },{
        status:404
      })
    }
    const user_id = JWT.decode(token!,process.env.JWT_SECRET!)
    const [data]:any[]=await pool.query('SELECT password FROM users WHERE user_id=?',[user_id])
    if(data?.length){
        const match = await compare(oldPassword,data[0]?.password)
        if(!match){
            return NextResponse.json({
                success:false,
                message:"Password not match"
            })
        }
        const hashpass = await hash(newPassword,10)
        await pool.query('UPDATE users SET password=? WHERE user_id=?',[hashpass,user_id])
    }
    return NextResponse.json({
        success:true,
        message:"Password Change Successfully"
    })
 
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success:false,
            message:"Something went wrong"
        },{
            status:500
        })
    }
}