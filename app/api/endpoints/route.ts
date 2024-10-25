import { DbPool, pool } from "@/lib/DB/pool";
import { generateTableSyntex } from "@/lib/helper/generateTableSyntex";
import { NextResponse } from "next/server";

export async function POST(Request:Request) {
    try {
        const {name,project_id,schmea}:{name:string,project_id:number,schmea:{name:string,type:string,required:boolean}[]}=await Request.json()
        if(!name || !project_id.toString()||!schmea.length){
            return NextResponse.json({
                success:false,
                message:"Please Fill All the required filed"
            })
        }
        const existpoint = 'SELECT name FROM `endpoints` WHERE project_id=? AND name=?'
        const [datas]:any=await pool.query(existpoint,[project_id,name])
        if(datas.length){
            return NextResponse.json({
                success:false,
                message:"Endpoint already exists"
            })
        }
        
       
        const makeEndPoint = 'INSERT INTO `endpoints`( `name`, `project_id`) VALUES (?,?)'
        const [rows]=await pool.query(makeEndPoint,[name,project_id])
        const getendpointId = 'SELECT MAX(primary_id) AS id FROM `endpoints` '
        const [ids]:any=await pool.query(getendpointId)
        const endpoint_id = ids[0]?.id
        schmea.forEach(async item=>{
            const sql = 'INSERT INTO `scheme`( `primary_id`, `name`, `type`, `required`) VALUES (?,?,?,?)'
            const values = [endpoint_id,item.name,item.type,item.required]
            const [rows]= await pool.query(sql,values)
        })
        const tableName = name+project_id.toString()
        const user_db_sql = await generateTableSyntex(schmea,tableName)
        const [rowsd] = await DbPool.query(user_db_sql!) 
        return NextResponse.json({
            success:true,
            message:"Endpoint Create Successfully"
        })
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"Something went wrong"
        })
    }
}

