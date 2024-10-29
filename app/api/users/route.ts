import { UserType } from "@/lib/Types/types";
import { NextResponse } from "next/server";
import user_data from "@/lib/tempData/user.json";
import bcrypt from "bcrypt"
import { pool } from "@/lib/DB/pool";
import { NormalizeError } from "next/dist/shared/lib/utils";
import { error } from "console";
import { cookies } from "next/headers";
export async function POST(Request: Request) {
  try {
    const { name, email, password, confirm_password, social_login }: UserType =
      await Request.json();
      await pool.query('CREATE TABLE IF NOT EXISTS users (user_id int not null AUTO_INCREMENT PRIMARY KEY,name varchar(256),email varchar(256),password varchar(256),member varchar(256),social_login boolean)')
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
      const [rows]:any =await pool.query(sqlite,[email])
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
   const data=await pool.query(sql,VALUES)
      
      
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
      const [rows]:any =await pool.query(sqlite,[email])
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
   const data=await pool.query(sql,VALUES)
      
      
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
        return NextResponse.json(
            {
              success: true,
              message: "data get successfully",
              data:user_data
            },
            {
              status: 200,
            }
          );
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