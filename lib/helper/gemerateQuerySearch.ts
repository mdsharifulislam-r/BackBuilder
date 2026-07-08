export async function generateQuerySearch(tableName:string,obj:any) {
    try {
      
        const keys = Object.keys(obj)
        const values = Object.values(obj)
        let str = ""
        for(let i of keys){
            str+=`${i}=? AND `
        }
        const substr = str.slice(0,str.length-4)
        const sql = `SELECT * FROM ${tableName} WHERE ${substr}`
        return {sql,values}
        
        
    } catch (error) {
        console.log(error);
        
    }
}