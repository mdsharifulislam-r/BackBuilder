import { pool } from "@/lib/DB/pool";
import { NextRequest, NextResponse } from "next/server";

export async function GET(Request:NextRequest,{params}:{params:{id:string}}) {
    try {
        const {id}= params
        const query = Request.nextUrl.searchParams.get("single")
        
        if(query=='true'){
            const sql = 'SELECT * FROM `endpoints` WHERE primary_id=?'
            const [rows]:any= await pool.execute(sql,[id])
            return NextResponse.json({
                success:true,
                message:"data get successfully",
                data:rows[0]
            })
        }
        
        const sql = 'SELECT * FROM `endpoints` WHERE project_id=?'
        const [rows]= await pool.execute(sql,[id])
      
        
        return NextResponse.json({
            success:true,
            message:"data get successfully",
            data:rows
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

export async function DELETE(Request:Request,{params}:{params:{id:string}}) {
    try {
       const {id} = params
       const {name,project_id}=await Request.json()
       if(!name && !project_id){
        return NextResponse.json({
            success:false,
            message:"Invalid credintials"
        })
       }
       // Delete The endpoint
       const da = await pool.execute('DELETE FROM `endpoints` WHERE primary_id=?',[id])
       // Delete The schema
       const ka = await pool.execute('DELETE FROM `scheme` WHERE primary_id=?',[id])
       // Delete The Database
       const sa = await pool.execute(`DROP TABLE ${name+project_id}`)
       return NextResponse.json({
        success:true,
        message:"Enpoint Delete Successfully"
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


export async function PATCH(Request:Request,{params}:{params:{id:string}}) {
    try {
       const {id} = params
       const {is_auth_required}=await Request.json()

       const [rows] = await pool.execute('UPDATE `endpoints` SET is_auth_required=? WHERE primary_id=?',[is_auth_required,id])
    
       
       return NextResponse.json({
        success:true,
        message:"Enpoint Update Successfully"
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