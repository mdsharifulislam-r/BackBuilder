export async function generateUpdateSql(request:any,tablename:string,primary_id:string) {
    try {
        
        const keys = Object.keys(request)
        const tvalues = Object.values(request)
        let str = ''
        for(let i of keys){
            str+=`${i}=?,`
        }
        const newstr = str.slice(0,str.length-1)
        const sql = `UPDATE ${tablename} SET ${newstr} WHERE primary_id=?`
        const values = [...tvalues,primary_id]
        return {sql,values}        
        
    } catch (error) {
        console.log(error);
        
    }
}