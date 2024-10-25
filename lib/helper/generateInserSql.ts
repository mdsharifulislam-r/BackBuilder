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