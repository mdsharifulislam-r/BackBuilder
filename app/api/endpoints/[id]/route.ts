import { pool } from "@/lib/DB/pool";
import { NextResponse } from "next/server";

export async function GET(Request:Request,{params}:{params:{id:string}}) {
    try {
        const {id}= params
        console.log(id);
        
        const sql = 'SELECT * FROM `endpoints` WHERE project_id=?'
        const [rows]= await pool.execute(sql,[id])
        console.log(rows);
        
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