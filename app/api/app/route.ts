import { pool } from "@/lib/DB/pool";
import { MyResponse } from "@/lib/helper/MyResponse";
import { NextApiRequest } from "next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jwt-simple"
import { validateUser } from "@/lib/helper/tokenValidate";
export async function POST(Request:Request) {
    try {
        const {app_name,image,description,authorize_redirect_url} = await Request.json()
        const clientId = crypto.randomUUID()
        const clientSecret = crypto.randomUUID()
        await pool.execute('CREATE TABLE IF NOT EXISTS apps (app_id int not null AUTO_INCREMENT PRIMARY KEY,app_name varchar(256),image varchar(256),description varchar(256),authorize_redirect_url varchar(256), user_id int,client_id varchar(256),client_secret varchar(256))')
        // await pool.execute('ALTER TABLE apps ADD COLUMN client_id varchar(256) DEFAULT NULL, ADD COLUMN client_secret varchar(256) DEFAULT NULL')
        const user_id = validateUser()
        if(!user_id){
            return MyResponse({success:false,message:"Token expired please re login"},400)
        }
        if(!app_name || !image || !description || !authorize_redirect_url || !user_id){
            return MyResponse({success:false,message:"Invalid credintials"},400)
        }
        
        const sql = 'INSERT INTO `apps`(`app_name`, `image`, `description`, `authorize_redirect_url`, `user_id`, `client_id`, `client_secret`) VALUES (?,?,?,?,?,?,?)'
        const values = [app_name,image,description,authorize_redirect_url,user_id,clientId,clientSecret]
        await pool.execute(sql,values)
        return NextResponse.json({success:true,message:"App created successfully"})
        
    } catch (error) {
        console.log(error);
        
        return MyResponse({success:false,message:"Something went wrong"},500)
    }
}


export async function GET(Request:Request) {
    try {
        const user_id = validateUser()
        if(!user_id){
            return MyResponse({success:false,message:"Token expired please re login"},400)
        }
        const sql = 'SELECT * FROM `apps` WHERE user_id=?'
        const [rows]:any = await pool.execute(sql,[user_id])
        return NextResponse.json({success:true,data:rows,message:"Data get successfully"})
    } catch (error) {
        console.log(error);
        
        return MyResponse({success:false,message:"Something went wrong"},500)
    }
}