import { UserType } from "@/lib/Types/types";
import { NextResponse } from "next/server";
import user_data from "@/lib/tempData/user.json";
import bcrypt from "bcrypt"
import { pool } from "@/lib/DB/pool";
import { NormalizeError } from "next/dist/shared/lib/utils";
import { error } from "console";
import { cookies } from "next/headers";
import JWT from 'jwt-simple'
export async function POST(Request: Request) {
  try {
    const { name, email, password, confirm_password, social_login }: UserType =
      await Request.json();
      await pool.execute('CREATE TABLE IF NOT EXISTS users (user_id int not null AUTO_INCREMENT PRIMARY KEY,name varchar(256),email varchar(256),password varchar(256),member varchar(256),social_login boolean)')
    if (!social_login) {
      if (!(name && email && password && confirm_password)) {
        return NextResponse.json(
          {
            success: false,
            message: "Please fill all required fields",
          },
          {
            status: 400,
          }
        );
      }
      if (!(password == confirm_password)) {
        return NextResponse.json(
          {
            success: false,
            message: "Password Not match",
          },
          {
            status: 400,
          }
        );
      }
      const sqlite = 'SELECT * FROM `users` WHERE email= ?'
      const [rows]:any =await pool.execute(sqlite,[email])
       const exist =rows[0]
      if(exist?.email){
        return NextResponse.json(
            {
              success: false,
              message: "Account already exist",
            },
            {
              status: 400,
            }
          );
      }
  const hashpassowrd = await bcrypt.hash(password,10)


      const sql = 'INSERT INTO `users`(`user_id`, `name`, `email`, `member`, `password`, `social_login`) VALUES (?,?,?,?,?,?)'


      const VALUES = [null,name,email,'basic',hashpassowrd,false]
   const data=await pool.execute(sql,VALUES)
      
      
      return NextResponse.json(
        {
          success: true,
          message: "Successfully created account",
        },
        {
          status: 200,
        }
      );
    }else{
      const sqlite = 'SELECT * FROM `users` WHERE email= ?'
      const [rows]:any =await pool.execute(sqlite,[email])
       const exist =rows[0]
      if(exist?.email){
        return NextResponse.json(
            {
              success: false,
              message: "Account already exist",
            },
            {
              status: 400,
            }
          );
      }



      const sql = 'INSERT INTO `users`(`user_id`, `name`, `email`, `member`,  `social_login`) VALUES (?,?,?,?,?)'


      const VALUES = [null,name,email,'basic',true]
   const data=await pool.execute(sql,VALUES)
      
      
      return NextResponse.json(
        {
          success: true,
          message: "Successfully created account",
        },
        {
          status: 200,
        }
      );
    }
  } catch (error) {
console.log(error);


    
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}


export async function GET() {
    try {
      const token = cookies().get('token')?.value
      if(!token){
        return NextResponse.json({
          success:false,
          message:"Token Expired"
        },{
          status:404
        })
      }
      const user_id = JWT.decode(token!,process.env.JWT_SECRET!)
      const [data]:any[]= await pool.execute('SELECT * FROM users WHERE user_id=?',[user_id])
      if(data?.length){
        return NextResponse.json(
          {
            success: true,
            message: "data get successfully",
            data:data[0]
          },
          {
            status: 200,
          }
        );
      }else{
        return NextResponse.json(
          {
            success: false,
            message: "Data not found",
     
          },
          {
            status: 400,
          }
        );
      }
    
    } catch (error) {
        return NextResponse.json(
            {
              success: false,
              message: "Something went wrong",
            },
            {
              status: 500,
            }
          );
    }
}

export async function DELETE(Request:Request) {
  try {
    cookies().delete('token')
    return NextResponse.json({
      success:true,
      message:"Logout Successfull"
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(Request:Request) {
  try {
    const {email,name}:{email:string,name:string}=await Request.json()
    if(!email || !name){
      return NextResponse.json({
        success:false,
        message:"Inavalid credintials"
      })
    }
    const token = cookies().get('token')?.value
    if(!token){
      return NextResponse.json({
        success:false,
        message:"Token Expired"
      },{
        status:404
      })
    }
    const user_id = JWT.decode(token!,process.env.JWT_SECRET!)
    const [exist]:any[] = await pool.execute('SELECT * FROM users WHERE user_id !=? AND email=?',[user_id,email])
    if(exist?.length){
      return NextResponse.json({
        success:false,
        message:"Email already exist"
      })
    }
    await pool.execute('UPDATE users SET name=?,email=? WHERE user_id=?',[name,email,user_id])
    return NextResponse.json({
      success:true,
      message:"Data update successfully"
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}