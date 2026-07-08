import { Rethink_Sans } from "next/font/google";
import { pool } from "../DB/pool";

export async function CheckOrigin(Request:any,project_id:string) {
    try {
        const origin = Request.headers.get("origin")
        const same = Request.headers.get("sec-fetch-site")

        if(same=='same-origin'){
            
            
            return true
        }
        const [rows]:any[] = await pool.execute('SELECT origins FROM projects WHERE project_id=?',[project_id])
        const data:{origins:string}[]=rows
        const item = data[0]?.origins
        if(item){
            const isMatch = item.split(",").some(item=>item==origin)
            return isMatch
        }
        return true
    } catch (error) {
        console.log(error);
        
    }
}