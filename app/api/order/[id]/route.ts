import { ConnectDB } from "@/lib/Database/ConnectDB"
import { OrderModel } from "@/lib/Database/Models"
import { NextResponse } from "next/server"
import jwt from "jwt-simple"
ConnectDB()
export async function GET(Request:Request,{params}:{params:{id:string}}) {
    try {
        const {id} = params
        const data = await OrderModel.find({userId:id})
        if(!data){
            return NextResponse.json({
                isOk:false,
                massage:"Data not found"
            })
        }
        return NextResponse.json({
            isOk:true,
            data,
            massage:"Data get successfully"
        })
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({
            isOk:false,
            massage:"Something error"
        })
    }
}


export async function DELETE(Request:Request,{params}:{params:{id:string}}) {
try {
    const {id} = params
    const orderId = jwt.decode(id,process.env.JWT_SECRET!)
    if(!orderId){
        return NextResponse.json({
            isOk:false,
            massage:"Id is not valid"
        })
    }
    const res = await OrderModel.findByIdAndDelete(orderId)
if(!res){
    return NextResponse.json({
        isOk:false,
        massage:"Something went wrong"
    })
}
return NextResponse.json({
    isOk:true,
    massage:"Order Cencel Successfully"
})
} catch (error) {
    return NextResponse.json({
        isOk:false,
        massage:"Something went wrong"
    })
}
    
}