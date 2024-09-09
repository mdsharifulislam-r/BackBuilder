import jwt from "jwt-simple"
import { NextResponse } from "next/server"
import { TbMassage } from "react-icons/tb"
import { Resend } from "resend"
import nodeMailer from 'nodemailer'
import { InstructorModel, StudentModel } from "@/lib/Database/Models"
const transport = nodeMailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
        user:process.env.ADMIN_EMAIL,
        pass:"muep ihcf srmo fmuo"
    }
})  
export async function POST(Request:Request){
    try {
        const {payload}:{payload:string} = await Request.json()
        const {otp,email}:{otp:number,email:string}= jwt.decode(payload,process.env.JWT_SECRET!)
        const exist = await StudentModel.findOne({email:email}) || await InstructorModel.findOne({email:email})
        if(exist){
            return NextResponse.json({
                isOk:false,
                massage:"Account Already Registerd"
            })
        }
        
        const info = await transport.sendMail({
            from:process.env.ADMIN_EMAIL,
            to:email,
            subject:"Verification Otp",
         html:`<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
	<div style="margin:50px auto;width:70%;padding:20px 0">
	  <div style="border-bottom:1px solid #eee">
		<a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Courseify</a>
	  </div>
	  <p style="font-size:1.1em">Hi,</p>
	  <p>Thank you for Registering Courseify. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
	  <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
	  <p style="font-size:0.9em;">Regards,<br />Courseify</p>
	  <hr style="border:none;border-top:1px solid #eee" />
	  <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
		<p>Courseify Inc</p>
		<p>1600 Amphitheatre Parkway</p>
		<p>California</p>
	  </div>
	</div>
  </div>`
        })
        if(info.accepted){
            return NextResponse.json({
                isOk:true,
                massage:"Email Send Successfully"
            })
        }else{
            return NextResponse.json({
                isOk:false,
                massage:"Something went wrong"
            })
        }
        
      
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            isOk:false,
            massage:"Something went wrong"
            
        })
        
    }
   
}