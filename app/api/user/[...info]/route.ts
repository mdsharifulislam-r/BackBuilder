import { NextResponse } from "next/server";
import userData from "@/lib/tempData/user.json"
import projects from "@/lib/tempData/projects.json"
import database from "@/lib/tempData/database.json"
import { compareFields } from "@/lib/helper/compareFields";

import { UserType } from "@/lib/Types/types";
import { DbPool, pool } from "@/lib/DB/pool";
import { generateInserSql } from "@/lib/helper/generateInserSql";
import { generateUpdateSql } from "@/lib/helper/generateUpdateSql";
export async function GET(Request:Request,{params}:{params:{info:string[]}}) {
    try {
      
        
        const userinfo = params.info
       console.log(userinfo);
       // Checkeing User Existence
        const [user]:any = await pool.query('SELECT * FROM `users` WHERE user_id = ?',[userinfo[0]])
        
        
        if(!user[0]?.user_id){
            return NextResponse.json({
                success:false,
                message:"user not found"
            })  
        }

        // Checking procject Existence
        const [project]:any = await pool.query('SELECT * FROM `projects` WHERE project_id=? AND user_id=?',[userinfo[1],userinfo[0]])
        if(!project[0]?.project_id){
            return NextResponse.json({
                success:false,
                message:"Project not found"
            })  
        }
        // Checking Endpoint

        const [endpoint]:any = await pool.query('SELECT * FROM `endpoints` WHERE name=? AND project_id=?',[userinfo[2],userinfo[1]])
        if(!endpoint[0]?.primary_id){
            return NextResponse.json({
                success:false,
                message:"Endpoint not found"
            })  
        }
        const [data]= await DbPool.query(`SELECT * FROM ${userinfo[2]+userinfo[1]}`)
        //Single query selector
        if(userinfo[3]){
            const [obj]:any = await DbPool.query(`SELECT * FROM ${userinfo[2]+userinfo[1]} WHERE primary_id=?`,[userinfo[3]])
            if(!obj[0]?.primary_id){
                return NextResponse.json({
                    success:false,
                    message:"data not found"
                })  
            }
            return NextResponse.json({
                success:true,
                message:"Successfully Get Data ",
                data:obj[0]
            })
        }
        return NextResponse.json({
            success:true,
            message:"Successfully Get Data of "+userinfo[2],
            data:data
        })
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({
            success:false,
            message:"Something went wrong"
        })
    }
  
}

export async function POST(Request:Request,{params}:{params:{info:string[]}}) {
    try {
        const userinfo = params.info
        console.log(userinfo);
        // Checkeing User Existence
         const [user]:any = await pool.query('SELECT * FROM `users` WHERE user_id = ?',[userinfo[0]])
         
         
         if(!user[0]?.user_id){
             return NextResponse.json({
                 success:false,
                 message:"user not found"
             })  
         }
 
         // Checking procject Existence
         const [project]:any = await pool.query('SELECT * FROM `projects` WHERE project_id=? AND user_id=?',[userinfo[1],userinfo[0]])
         if(!project[0]?.project_id){
             return NextResponse.json({
                 success:false,
                 message:"Project not found"
             })  
         }
         // Checking Endpoint
 
         const [endpoint]:any = await pool.query('SELECT * FROM `endpoints` WHERE name=? AND project_id=?',[userinfo[2],userinfo[1]])
         if(!endpoint[0]?.primary_id){
             return NextResponse.json({
                 success:false,
                 message:"Endpoint not found"
             })  
         }
         const [schmea]:any = await pool.query('SELECT * FROM `scheme` WHERE primary_id = ?',[endpoint[0]?.primary_id])
         const request = await Request.json()
         const compare = await compareFields(request,schmea)
         if(!compare){
            return NextResponse.json({
                success:false,
                message:"Please fill all required fields"
            },{
                status:404
            })  
         }
        const {sql,values}:any = await generateInserSql(request,userinfo[2]+userinfo[1])  
        const [rows]= await DbPool.query(sql,values)
        return NextResponse.json({
            success:true,
            message:"Data add successfully"
        })
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({
            success:false,
            message:"Something went wrong"
        })
    }
    
}
export async function PUT(Request:Request,{params}:{params:{info:string[]}}) {
    try {
        const userinfo = params.info
       if(!userinfo[3]){
        return NextResponse.json({
            success:false,
            message:"Primary id is not provided"
        },{
            status:404
        })
       }
        // Checkeing User Existence
         const [user]:any = await pool.query('SELECT * FROM `users` WHERE user_id = ?',[userinfo[0]])
         
         
         if(!user[0]?.user_id){
             return NextResponse.json({
                 success:false,
                 message:"user not found"
             })  
         }
 
         // Checking procject Existence
         const [project]:any = await pool.query('SELECT * FROM `projects` WHERE project_id=? AND user_id=?',[userinfo[1],userinfo[0]])
         if(!project[0]?.project_id){
             return NextResponse.json({
                 success:false,
                 message:"Project not found"
             })  
         }
         // Checking Endpoint
 
         const [endpoint]:any = await pool.query('SELECT * FROM `endpoints` WHERE name=? AND project_id=?',[userinfo[2],userinfo[1]])
         if(!endpoint[0]?.primary_id){
             return NextResponse.json({
                 success:false,
                 message:"Endpoint not found"
             })  
         }
         const request = await Request.json()
         const {sql,values}:any=await generateUpdateSql(request,userinfo[2]+userinfo[1],userinfo[3])

         
         const [rows]= await DbPool.query(sql,values)
        return NextResponse.json({
            success:true,
            message:"Data Update successfully"
        })

    } catch (error) {
        console.log(error);
        
        return NextResponse.json({
            success:false,
            message:"Something went wrong"
        })
    }
    
}

export async function DELETE(Request:Request,{params}:{params:{info:string[]}}) {
    try {
        const userinfo = params.info
       if(!userinfo[3]){
        return NextResponse.json({
            success:false,
            message:"Primary id is not provided"
        },{
            status:404
        })
       }
        // Checkeing User Existence
         const [user]:any = await pool.query('SELECT * FROM `users` WHERE user_id = ?',[userinfo[0]])
         
         
         if(!user[0]?.user_id){
             return NextResponse.json({
                 success:false,
                 message:"user not found"
             })  
         }
 
         // Checking procject Existence
         const [project]:any = await pool.query('SELECT * FROM `projects` WHERE project_id=? AND user_id=?',[userinfo[1],userinfo[0]])
         if(!project[0]?.project_id){
             return NextResponse.json({
                 success:false,
                 message:"Project not found"
             })  
         }
         // Checking Endpoint
 
         const [endpoint]:any = await pool.query('SELECT * FROM `endpoints` WHERE name=? AND project_id=?',[userinfo[2],userinfo[1]])
         if(!endpoint[0]?.primary_id){
             return NextResponse.json({
                 success:false,
                 message:"Endpoint not found"
             })  
         }
        
         

         
         const [rows]= await DbPool.query(`DELETE FROM ${userinfo[2]+userinfo[1]} WHERE primary_id=?`,[userinfo[3]])
        return NextResponse.json({
            success:true,
            message:"Data Delete successfully"
        })

    } catch (error) {
        console.log(error);
        
        return NextResponse.json({
            success:false,
            message:"Something went wrong"
        })
    }
    
}