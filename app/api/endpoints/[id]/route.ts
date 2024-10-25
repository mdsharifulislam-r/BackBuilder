import { pool } from "@/lib/DB/pool";
import { NextResponse } from "next/server";

export async function GET(Request:Request,{params}:{params:{id:string}}) {
    try {
        const {id}= params
        console.log(id);
        
        const sql = 'SELECT * FROM `endpoints` WHERE project_id=?'
        const [rows]= await pool.query(sql,[id])
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
        }) 
    }
}