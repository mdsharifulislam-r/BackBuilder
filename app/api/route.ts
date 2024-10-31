import { connectDB } from "@/lib/DB/connectDB";
import { NextResponse } from "next/server";

export async function GET(){
    await connectDB()
    return NextResponse.json({
        msg:"Server is Running"
    })
}