import { pool } from "@/lib/DB/pool"
import { NextResponse } from "next/server"

export async function  GET(Request:Request,{params}:{params:{id:string}}) {
    try {
        const {id}= params
       
        const [rows]:any= await pool.query('SELECT * FROM `scheme` WHERE primary_id=?',[id])
        if(!rows){
            return NextResponse.json({
                success:false,
                message:'Data not found'
            },{
                status:404
            })
            
        }
        
      return  NextResponse.json({
            success:true,
            message:"Data get succcessfully",
            data:rows
        })
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:'Something went wrong'
        },{
            status:500
        })
    }
}

export async function DELETE(Request:Request,{params}:{params:{id:string}}) {
    try {
        const {id}= params
        const [rows] = await pool.query('DELETE FROM `scheme` WHERE schema_id=?',[id])
        return NextResponse.json({
            success:true,
            message:"Schema deleted successfully"
        })
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:'Something went wrong'
        },{
            status:500
        })
    }
}