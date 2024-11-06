import { NextRequest, NextResponse } from "next/server";

export function middlewares(request:NextRequest) {
   
    const res = NextResponse.next()
    res.headers.append('ACCESS-CONTROL-ALLOW-ORIGIN',"*")
    res.headers.append('Access-Control-Allow-Headers', '*');

    return res
}

export const config = {
    matcher:['/api/:path*']
}