import { pool } from "@/lib/DB/pool";
import { MyResponse } from "@/lib/helper/MyResponse";
import { NextResponse } from "next/server";

export async function GET(Request:Request,{params}:{params:{id:string}}) {
    try {
        const sql = 'SELECT * FROM `apps` WHERE app_id=?'
        const [rows]:any = await pool.execute(sql,[params.id])
        return NextResponse.json({success:true,data:rows,message:"Data get successfully"})
    } catch (error) {
        console.log(error);
        
        return MyResponse({success:false,message:"Something went wrong"},500)
    }

}

export async function DELETE(Request:Request,{params}:{params:{id:string}}) {
    try {
        const sql = 'DELETE FROM `apps` WHERE app_id=?'
        const [rows]:any = await pool.execute(sql,[params.id])
        return NextResponse.json({success:true,data:rows,message:"Data get successfully"})
    } catch (error) {
        console.log(error);
        
        return MyResponse({success:false,message:"Something went wrong"},500)
    }

}