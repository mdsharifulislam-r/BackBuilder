import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
export async function AllowedOrigin(Request:any,Response:any) {
    try {
        await NextCors(Request, Response, {
            // Options
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            origin: '*',  // Allow all origins
            optionsSuccessStatus: 200,
          });
    } catch (error) {
        
    }
}