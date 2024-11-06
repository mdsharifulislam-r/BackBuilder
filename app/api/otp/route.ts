import { pool } from "@/lib/DB/pool";
import { NextResponse } from "next/server";
import nodeMailer from 'nodemailer'
const transport = nodeMailer.createTransport({
    service:"gmail",
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
        user:process.env.ADMIN_EMAIL,
        pass:process.env.APP_PASSWORD
    }
})  
export async function POST(Request:Request) {
    try {
        const {email}:{email:string}= await Request.json()
      await pool.execute('CREATE TABLE IF NOT EXISTS otps (email varchar(256),otp INT)')
        
        if(!email){
            return NextResponse.json({
                success:false,
                message:"Invalid credintials"
            },{
                status:400
            })
        }
        let otp = Math.floor(Math.random()*1000000000000).toString().slice(0,4)
       

        
        const info = await transport.sendMail({
            
            from:process.env.ADMIN_EMAIL,
            to:email,
            subject:"Verification Otp",
         html:`<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
	<div style="margin:50px auto;width:70%;padding:20px 0">
	  <div style="border-bottom:1px solid #eee">
		<a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Backbuilder</a>
	  </div>
	  <p style="font-size:1.1em">Hi,</p>
	  <p>Thank you for Registering Backbuilder. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
	  <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
	  <p style="font-size:0.9em;">Regards,<br />Courseify</p>
	  <hr style="border:none;border-top:1px solid #eee" />
	  <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
		<p>Backbuilder Inc</p>
		<p>1600 Amphitheatre Parkway</p>
		<p>California</p>
	  </div>
	</div>
  </div>`
        })
   
        
        if(info.accepted){
         
            
            const check = 'SELECT * FROM otps WHERE email=?'
            const [emails]:any[] = await pool.execute(check,[email])
            if(emails?.length){
                const [rowsData]= await pool.execute('UPDATE `otps` SET `otp`=? WHERE emai=?',[otp,email])
            }else{
                const sql = 'INSERT INTO `otps`(`email`, `otp`) VALUES (?,?)'
                const [rows] = await pool.execute(sql,[email,otp])
            }
           
            return NextResponse.json({
                success:true,
                message:"Email Send Successfully"
            })
        }else{
            
            
            return NextResponse.json({
                success:false,
                message:"Something went wrong"
            })
        }
       
        
      
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({
            success:false,
            message:"Something went wrong"
        },{
            status:500
        })
    }
}


export async function DELETE(Request:Request) {
    try {
        const {email,otp}:{email:string,otp:number}= await Request.json()
        if(!email || !otp){
            return NextResponse.json('invalid credintials')
        }
        const [rows]:any[] = await pool.execute('SELECT * FROM otps WHERE email=? AND otp=?',[email,otp])
        if(rows?.length){
            await pool.execute('DELETE FROM otps WHERE email=?',[email])
            return NextResponse.json({
                success:true,
                message:"Verification Successfully"
            })
        }else{
            return NextResponse.json({
                success:false,
                message:"OTP not match"
            })
        }
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success:false,
            message:"Something went wrong"
        },{
            status:500
        })
        
    }
}