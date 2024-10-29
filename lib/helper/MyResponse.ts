import { NextResponse } from "next/server";

export const MyResponse = (body:any,status:number,origins?:string[])=>NextResponse.json(body,{
    status:status,
    headers: {
        'Access-Control-Allow-Origin': origins?.length?origins.toString():"*",
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
})
