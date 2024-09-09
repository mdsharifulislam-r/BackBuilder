import { BookModel } from "@/lib/Database/Models";
import { NextResponse } from "next/server";
import jwt from "jwt-simple"
import { ConnectDB } from "@/lib/Database/ConnectDB";
ConnectDB()
export async function GET(Request:Request,{params}:{params:{id:string}}){
    try {
        const {id} = params
        const data = await BookModel.findOne({_id:id},{promocodes:0})
        if(!data){
            return NextResponse.json({
                isOk:false,
                massage:"Data not found"
            })
        }
        return NextResponse.json({
            isOk:true,
            massage:"Data get Successfully",
            data:data
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            isOk:false,
            massage:"Something went wrong"
        },{
            status:500
        })
        
    }
}

export async function PUT(Request:Request,{params}:{params:{id:string}}) {
    try {
        const {id} = params
        const {payload}= await Request.json()
        const isExist = await BookModel.findOne({_id:id})
        if(!isExist){
            return NextResponse.json({
                isOk:false,
                massage:"Data not found"
            },{
                status:404
            })
        }
        if(!payload){
            return NextResponse.json({
                isOk:false,
                massage:"Inavalid credintials"
            },{
                status:404
            })
        }
    const data = jwt.decode(payload,process.env.JWT_SECRET!)
    if(!data){
        return NextResponse.json({
            isOk:false,
            massage:"Something went wrong"
        },{
            status:400
        })
    }
    return NextResponse.json({
        isOk:true,
        massage:"Data update successfully"
    },{
        status:200
    })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            isOk:false,
            massage:"Something went wrong"
        },{
            status:500
        })
        
    }
}