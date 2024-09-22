import { CourseType } from "@/components/Courses/CourseCard/CourseCard";
import { ConnectDB } from "@/lib/Database/ConnectDB";
import { CourseModel } from "@/lib/Database/Models";
import { NextResponse } from "next/server";
export interface Promo{
    code:string,
    validity:string,
    amount:number,
    persons:number
}
ConnectDB()
export async function POST(Request:Request){
    
    try {
        const {id,code}:{id:string,code:string} = await Request.json()
        
        
        if(code && id){
            const course:CourseType | null = await CourseModel.findOne({_id:id})  
            if(course && course.promocodes){
               
                    const promo = course.promocodes.filter(item=>item.code==code)[0]
                    if(promo){
                        if(promo.persons>0)
                        {
                            return NextResponse.json({
                                isOk:true,
                                discount:promo.amount,
                                message:"Congragulatios you have get the dicount"
                            },{
                                status:200
                            })
                        }else{
                            return NextResponse.json({
                                isOk:false,
                                message:"Discount limit end"
                            },{
                                status:400
                            })
                        }
                        
                    }else{
                        return NextResponse.json({
                            isOk:false,
                            message:"Discount not found"
                        },{
                            status:404
                        })
                    }
                
            }else{
                return NextResponse.json({
                    isOk:false,
                    message:"Course not found"
                },{
                    status:404
                })
            
            }
        }else{
            return NextResponse.json({
                isOk:false,
                message:"Fill All data"
            },{
                status:404
            })
        
        }
       
    } catch (error) {
        return NextResponse.json({
            isOk:false,
            message:"Fill All data"
        },{
            status:404
        })
        console.log(error);
        
    }
}