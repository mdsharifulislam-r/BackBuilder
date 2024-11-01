import { DbPool, pool } from "@/lib/DB/pool";
import { compareFields } from "@/lib/helper/compareFields";
import { CheackLogin, generateInserSql, generateInserSqlForRegister } from "@/lib/helper/generateInserSql";
import { MyResponse } from "@/lib/helper/MyResponse";
import { NextResponse } from "next/server";


export async function POST(Request:Request,{params}:{params:{info:string[]}}) {
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
 
         const [endpoint]:any = await pool.execute('SELECT * FROM `endpoints` WHERE name=? AND project_id=?',[userinfo[2],userinfo[1]])
         if(!endpoint[0]?.primary_id){
             return MyResponse({
                 success:false,
                 message:"Endpoint not found"
             },404) 
         }
         if(!userinfo[3]){
            return MyResponse({
                success:false,
                message:"No action here"
            },401)
         }
         const request = await Request.json()
         if(userinfo[3]=='register'){
         const [schmea]:any = await pool.execute('SELECT * FROM `scheme` WHERE primary_id = ?',[endpoint[0]?.primary_id])
         
         const compare = await compareFields(request,schmea)
         if(!compare){
            return MyResponse({
                success:false,
                message:"Please fill all required fields"
            },401)  
         }
        const {sql,values}:any = await generateInserSqlForRegister(request,userinfo[2]+userinfo[1])  
        const [rows]= await Dbpool.execute(sql,values)
        return MyResponse({
            success:true,
            message:"Data add successfully"
        },200)
    }
    const {isOk,data}:any = await CheackLogin(request,userinfo[2]+userinfo[1])
    console.log(isOk,data);
    
    if(isOk){
        return MyResponse({
            success:true,
            message:"Successfully Login",
            data:data
        },200)
    }else{
        return MyResponse({
            success:false,
            message:data
        },401)
    }
    } catch (error) {
        console.log(error);
        
        return MyResponse({
            success:false,
            message:"Something went wrong"
        },404)
    }
    
}
