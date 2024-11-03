import { Number } from "mongoose";
import { NextResponse } from "next/server";


export const MyResponse = (body:any,status?:number)=>{
  const response = NextResponse.json(body,{status:status})
  response.headers.set("Access-Control-Allow-Origin","*")
  response.headers.set("Access-Control-Allow-Methods","*")
  response.headers.set("same-origin",'auto')
  return response
}
// Response.json(body,{status:status,
//   headers: {
//       'Access-Control-Allow-Origin': "*",
//       'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//       'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//       'Content-Type': 'application/json',
//     },
// })
