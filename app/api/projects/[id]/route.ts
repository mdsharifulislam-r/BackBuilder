import { pool } from "@/lib/DB/pool";
import { Cookie } from "next/font/google";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import JWT from "jwt-simple"
import { MyResponse } from "@/lib/helper/MyResponse";

export async function GET(Request:Request,{params}:{params:{id:string}}) {
    try {
        const {id}=params
        if(!id){
            return NextResponse.json({
                success:false,
                message:"invalid credintials"
            })
        }
        const token = cookies().get("token")?.value
     
        const user_id = JWT.decode(token!,process.env.JWT_SECRET!)
        
        
        const sql = 'SELECT * FROM `projects` WHERE user_id=? AND project_id=?'
        const [rows]:any=await pool.execute(sql,[user_id,id])
        if(rows){
            return NextResponse.json({
                success:true,
                message:"Data get successfully",
                data:rows[0]
            })
        }else{
            return NextResponse.json({
                success:false,
                message:"data get unsuccessfull"
            })
        }

        
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"Something went wrong"
        })
    }
}
export async function DELETE(request:Request,{params}:{params:{id:string}}){
    try {
        const {id}=params
        const [rows]:any[]=await pool.execute('SELECT primary_id,name FROM endpoints WHERE project_id=?',[id])
        const data:{primary_id:number,name:string}[] = rows
        if(rows){
            data?.forEach(async item=>{
                const res = await fetch(`${process.env.BASE_URL}/endpoints/${item.primary_id}`,{
                    method:"DELETE",
                    body:JSON.stringify({
                        project_id:id,
                        name:item.name
                    })
                })
            })
        }
        const [rosws]= await pool.execute('DELETE FROM projects WHERE project_id=?',[id])
        return NextResponse.json({
            success:true,
            message:"Successfully data deleted"
        })

    } catch (error) {
        console.log(error);
        
        return NextResponse.json({
            success:false,
            message:"Something went wrong"
        })
    }
}

export async function POST(Request:Request,{params}:{params:{id:string}}) {
    try {
        const {id}=params
        const {domain}=await Request.json()
        if(!domain){
            return NextResponse.json({
                success:false,
                message:"Domain is not provided"
            })
        }
        const [data]:any[]= await pool.execute('SELECT * FROM projects WHERE project_id=?',[id])
      
        
        if(data[0]?.project_id){
            if(data[0]?.origins){
                const origindata = data[0]?.origins+`,${domain}`
                const [rows]= await pool.execute('UPDATE `projects` SET origins=? WHERE project_id = ?',[origindata,id])
            }else{
                const [rows]= await pool.execute('UPDATE `projects` SET origins=? WHERE project_id = ?',[domain,id])
            }
        }else{
            return NextResponse.json({
                success:false,
                message:'Porject not found'
            },{
                status:404
            })
        }
        return NextResponse.json({
            success:true,
            message:"Domain Add Successfully"
        })
        
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"Something went wrong"
        })
    }
}

export async function PUT(Request:Request,{params}:{params:{id:string}}) {
    try {
        const {id}=params
        const {domain}=await Request.json()
        if(!domain){
            return NextResponse.json({
                success:false,
                message:"Domain is not provided"
            })
        }
        const [data]:any[]= await pool.execute('SELECT * FROM projects WHERE project_id=?',[id])
      
        
        if(data[0]?.project_id){
            if(data[0]?.origins){
                const origindata:string = data[0]?.origins
                const stringData = origindata?.split(",").filter(item=>item!=domain).toString()
                const [rows]= await pool.execute('UPDATE `projects` SET origins=? WHERE project_id=?',[stringData,id])
            }else{
                return MyResponse({
                    success:false,
                    message:"Domain not exist"
                },404)
            }
        }else{
            return NextResponse.json({
                success:false,
                message:'Porject not found'
            },{
                status:404
            })
        }
        return NextResponse.json({
            success:true,
            message:"Data Update successfully"
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