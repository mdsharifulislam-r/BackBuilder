import bcrypt, { compare } from 'bcrypt'
import { pool } from '../DB/pool'
export async function generateInserSql(request:any,tableName:string) {
    try {
      
        const keys = Object.keys(request)
        const values = Object.values(request)
        const qn = new Array(keys.length).fill('?,').join("")
        const qn2 = qn.slice(0,qn.length-1)
        const clm = keys.join(",")
       const sql = `INSERT INTO ${tableName} (${clm}) VALUES (${qn2})`
        if(sql && values){
            return {sql,values}
        }else{
            return {
                sql:"",
                values:[]
            }
        }
       
        
    } catch (error) {
        console.log(error);
        
    }
}

export async function generateInserSqlForRegister(request:any,tableName:string) {
    try {
      
        const keys = Object.keys(request)
        let values:string[] = Object.values(request)
        const passIndex = keys.findIndex(item=>item=='password')
        const emailIndex = keys.findIndex(item=>item=='email')
        const [rows]:any[] = await pool.execute(`SELECT * FROM ${tableName} WHERE email=?`,[values[emailIndex]])
        if(rows?.length){
            return {
                sql:"",
                values:[]
            }
        }
        const hashpass = await bcrypt.hash(values[passIndex],10)
        values[passIndex]=hashpass
        const qn = new Array(keys.length).fill('?,').join("")
        const qn2 = qn.slice(0,qn.length-1)
        const clm = keys.join(",")
       const sql = `INSERT INTO ${tableName} (${clm}) VALUES (${qn2})`
        if(sql && values){
            return {sql,values}
        }else{
            return {
                sql:"",
                values:[]
            }
        }
       
        
    } catch (error) {
        console.log(error);
        
    }
}

export async function CheackLogin(request:any,tableName:string) {
    try {
      
        const keys = Object.keys(request)
        let values:string[] = Object.values(request)
        const passIndex = keys.findIndex(item=>item=='password')
        const EmailIndex = keys.findIndex(item=>item=='email')
        const password = values[passIndex]
        const email = values[EmailIndex]
        const [rows]:any[] = await pool.execute(`SELECT * FROM ${tableName} WHERE email = ?`,[email])
        if(rows?.length){
            const hashpass = rows[0]?.password
            const match = await bcrypt.compare(password,hashpass)
            if(match){
                return {isOk:true,data:rows[0]}
            }else{
                return {isOk:false,data:"password not match"}
            }
        }else{
            return {isOk:false,data:"User not found"}
        }
       
       
        
    } catch (error) {
        console.log(error);
        
    }
}