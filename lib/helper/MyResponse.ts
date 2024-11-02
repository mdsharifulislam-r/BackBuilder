import { Number } from "mongoose";
import { NextResponse } from "next/server";

export const MyResponse = (body:any,status?:number)=>Response.json(body,{status:status,
  headers: {
      'Access-Control-Allow-Origin': "*",
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Type': 'application/json',
    },
})
