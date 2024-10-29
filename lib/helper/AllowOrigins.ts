import { Rethink_Sans } from "next/font/google";
import { pool } from "../DB/pool";

export async function CheckOrigin(Request:Request,project_id:string) {
    try {
        const origin = Request.headers.get("origin")
        const [rows]:any[] = await pool.query('SELECT origins FROM projects WHERE project_id=?',[project_id])
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