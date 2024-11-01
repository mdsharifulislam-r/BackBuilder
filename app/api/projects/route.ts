import { ProjectType } from "@/lib/Types/types";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jwt-simple"
import project from "@/lib/tempData/projects.json"
import { pool } from "@/lib/DB/pool";

export async function POST(Request:Request) {
    try {
        
      const {project_name,description}:{project_name:string,description:string}=await Request.json()
      const token = cookies().get("token")?.value

      if(!token){
        return NextResponse.json({
            success:false,
            message:"Token expired please re login"
        },{
            status:400
        })
      }
      await pool.execute('CREATE TABLE IF NOT EXISTS projects (project_id int not null AUTO_INCREMENT PRIMARY KEY,user_id int,project_name varchar(256), description varchar(256),origins varchar(256))')
      const user_id = jwt.decode(token,process.env.JWT_SECRET!)
      if(!project_name){
        return NextResponse.json({
            success:false,
            message:"Invalid credintials"
        },{
            status:400
        })
      }
     const sql = 'INSERT INTO `projects`(`user_id`, `project_name`, `description`) VALUES (?,?,?)'
     const values = [user_id,project_name,description?description:""]
     const [rows]:any = await pool.execute(sql,values)
     if(!rows){
        return NextResponse.json({
            success:false,
            message:"Invalid credintials"
        },{
            status:400
        })
     }
      return NextResponse.json({
        success:true,
        message:"project created successfully"
      })
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"something went wrong"
        },{
            status:500
        })
    }
}

export async function GET() {
    try {
        const token = cookies().get("token")?.value
 
        
        if(!token){
          return NextResponse.json({
              success:false,
              message:"Token expired please re login"
          },{
              status:400
          })
        }
        const user_id = jwt.decode(token,process.env.JWT_SECRET!)
        console.log(user_id);
        
        const sql = 'SELECT * FROM `projects` WHERE user_id= ?'
        const [rows]:any =await pool.execute(sql,[user_id])
   
            return NextResponse.json({
                success:true,
                data:rows,
                message:"Data get successfully"
            })
       
        
    } catch (error) {
        
        
        return NextResponse.json({
            success:false,
            message:"something went wrong"
        },{
            status:500
        })   
    }
}