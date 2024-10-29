import { NextResponse } from "next/server";
import user_data from "@/lib/tempData/user.json"
import { compare, compareSync } from "bcrypt";
import jwt from "jwt-simple"
import { pool } from "@/lib/DB/pool";
import { UserType } from "@/lib/Types/types";
import { validateHeaderValue } from "http";
import { cookies } from "next/headers";

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
        cookies().delete("token")
        return NextResponse.json({
            success:false,
            message:"Successfully Logout"
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