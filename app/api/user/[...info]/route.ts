import { NextRequest, NextResponse } from "next/server";
import userData from "@/lib/tempData/user.json"
import projects from "@/lib/tempData/projects.json"
import database from "@/lib/tempData/database.json"
import { compareFields } from "@/lib/helper/compareFields";

import { UserType } from "@/lib/Types/types";
import { pool } from "@/lib/DB/pool";
import { CheackLogin, generateInserSql } from "@/lib/helper/generateInserSql";
import { generateUpdateSql } from "@/lib/helper/generateUpdateSql";
import { NextApiRequest, NextApiResponse } from "next";

import microCors from 'micro-cors';
import { middleware } from "@/lib/middlewares/AllowedOrigin";
import { CheckOrigin } from "@/lib/helper/AllowOrigins";
import { MyResponse } from "@/lib/helper/MyResponse";
import { request } from "http";
import { runCors } from "@/lib/helper/cors";

export const dynamic = 'force-dynamic'

 export async function GET(Request:Request,{params}:{params:{info:string[]}}) {
    try {
       
        const userinfo = params.info
    
       // Checkeing User Existence
        const [user]:any = await pool.execute('SELECT * FROM `users` WHERE user_id = ?',[userinfo[0]])
        
        
        if(!user[0]?.user_id){
            return MyResponse({
                success:false,
                message:"User not found"
            },404)
        }

        // Checking procject Existence
        const [project]:any = await pool.execute('SELECT * FROM `projects` WHERE project_id=? AND user_id=?',[userinfo[1],userinfo[0]])
        if(!project[0]?.project_id){
            return MyResponse({
                success:false,
                message:"Project not found"
            },404)  
        }
        // Checking Endpoint
const match = await CheckOrigin(Request,userinfo[1])
if(!match){
    return MyResponse({
        success:false,
        message:"origin not allowed"
    },401)
}
        const [endpoint]:any = await pool.execute('SELECT * FROM `endpoints` WHERE name=? AND project_id=?',[userinfo[2],userinfo[1]])
        if(!endpoint[0]?.primary_id){
            return MyResponse({
                success:false,
                message:"Endpoint not found"
            },404) 
        }
        const [data]= await pool.execute(`SELECT * FROM ${userinfo[2]+userinfo[1]}`)
        //Single query selector
        if(userinfo[3]){
            const [obj]:any = await pool.execute(`SELECT * FROM ${userinfo[2]+userinfo[1]} WHERE primary_id=?`,[userinfo[3]])
            if(!obj[0]?.primary_id){
                return MyResponse({
                    success:false,
                    message:"data not found"
                },404) 
            }
            return MyResponse({
                success:true,
                message:"Successfully Get Data ",
                data:obj[0]
            },200)
        }
        return MyResponse({
            success:true,
            message:"Successfully Get Data of "+userinfo[2],
            data:data
        },200)
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({
            success:false,
            message:"Something went wrong"
        },{
            headers:{
                'Access-Control-Allow-Origin': '*',
                
              }
        })
    }
  
}


export async function POST(Request:Request,{params}:{params:{info:string[]}}) {
    try {
        const userinfo = params.info
    
        // Checkeing User Existence
         const [user]:any = await pool.execute('SELECT * FROM `users` WHERE user_id = ?',[userinfo[0]])
         const match = await CheckOrigin(Request,userinfo[1])
if(!match){
    return MyResponse({
        success:false,
        message:"origin not allowed"
    },401)
}
         
         if(!user[0]?.user_id){
             return MyResponse({
                 success:false,
                 message:"User not found"
             },404)
         }
 
         // Checking procject Existence
         const [project]:any = await pool.execute('SELECT * FROM `projects` WHERE project_id=? AND user_id=?',[userinfo[1],userinfo[0]])
         if(!project[0]?.project_id){
             return MyResponse({
                 success:false,
                 message:"Project not found"
             },404)  
         }
         // Checking Endpoint
 
         const [endpoint]:any = await pool.execute('SELECT * FROM `endpoints` WHERE name=? AND project_id=?',[userinfo[2],userinfo[1]])
         if(!endpoint[0]?.primary_id){
             return MyResponse({
                 success:false,
                 message:"Endpoint not found"
             },404) 
         }
         const [schmea]:any = await pool.execute('SELECT * FROM `scheme` WHERE primary_id = ?',[endpoint[0]?.primary_id])
         const request = await Request.json()
         const compare = await compareFields(request,schmea)
         if(!compare){
            return MyResponse({
                success:false,
                message:"Please fill all required fields"
            },404)
        }
        const {sql,values}:any = await generateInserSql(request,userinfo[2]+userinfo[1])  
        const [rows]= await pool.execute(sql,values)
        return NextResponse.json({
            success:true,
            message:"Data add successfully"
        },{
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
              },
        })
    } catch (error) {
     
        
        return MyResponse({
            success:false,
            message:"Something went wrong"
        },500)
    }
    
}
export async function PUT(Request:Request,{params}:{params:{info:string[]}}) {
    try {
      
       
        const userinfo = params.info
        if(!userinfo[3]){
            return MyResponse({
                success:false,
                message:"Primary id is not provided"
            },404)
           }
        // Checkeing User Existence
         const [user]:any = await pool.execute('SELECT * FROM `users` WHERE user_id = ?',[userinfo[0]])
         
         Request.headers.set("origin","http://localhost:3000")
         console.log(Request.headers.get("origin"));
         if(!user[0]?.user_id){
             return MyResponse({
                 success:false,
                 message:"User not found"
             },404)
         }
 
         // Checking procject Existence
         const [project]:any = await pool.execute('SELECT * FROM `projects` WHERE project_id=? AND user_id=?',[userinfo[1],userinfo[0]])
         if(!project[0]?.project_id){
             return MyResponse({
                 success:false,
                 message:"Project not found"
             },404)  
         }
         // Checking Endpoint
 
         const [endpoint]:any = await pool.execute('SELECT * FROM `endpoints` WHERE name=? AND project_id=?',[userinfo[2],userinfo[1]])
         if(!endpoint[0]?.primary_id){
             return MyResponse({
                 success:false,
                 message:"Endpoint not found"
             },404) 
         }
         const request = await Request.json()
         const {sql,values}:any=await generateUpdateSql(request,userinfo[2]+userinfo[1],userinfo[3])

         
         const [rows]= await pool.execute(sql,values)
        return MyResponse({
            success:true,
            message:"Data Update successfully"
        },200)

    } catch (error) {
        console.log(error);
        
        return MyResponse({
            success:false,
            message:"Something went wrong"
        },500)
    }
    
}

export async function DELETE(Request:Request,{params}:{params:{info:string[]}}) {
    try {
        const userinfo = params.info
        if(!userinfo[3]){
            return MyResponse({
                success:false,
                message:"Primary id is not provided"
            },404)
           }
        // Checkeing User Existence
         const [user]:any = await pool.execute('SELECT * FROM `users` WHERE user_id = ?',[userinfo[0]])
         
         
         if(!user[0]?.user_id){
             return MyResponse({
                 success:false,
                 message:"User not found"
             },404)
         }
 
         // Checking procject Existence
         const [project]:any = await pool.execute('SELECT * FROM `projects` WHERE project_id=? AND user_id=?',[userinfo[1],userinfo[0]])
         if(!project[0]?.project_id){
             return MyResponse({
                 success:false,
                 message:"Project not found"
             },404)  
         }
         // Checking Endpoint
 
         const [endpoint]:any = await pool.execute('SELECT * FROM `endpoints` WHERE name=? AND project_id=?',[userinfo[2],userinfo[1]])
         if(!endpoint[0]?.primary_id){
             return MyResponse({
                 success:false,
                 message:"Endpoint not found"
             },404) 
         }
         
         const [rows]= await pool.execute(`DELETE FROM ${userinfo[2]+userinfo[1]} WHERE primary_id=?`,[userinfo[3]])
        return MyResponse({
            success:true,
            message:"Data Delete successfully"
        },200)

    } catch (error) {
        console.log(error);
        
        return MyResponse({
            success:false,
            message:"Something went wrong"
        },200)
    }
    
}
export async function OPTIONS(Request:Request) {
    try {
       
        
       return MyResponse({
        success:false,
        message:"Method not allowed"
       },401)
    } catch (error) {
        console.log(error);
        
        return MyResponse({
            success:false,
            message:"Something went wrong"
        },200)
    }
}

