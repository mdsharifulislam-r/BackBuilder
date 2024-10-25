
export async function compareFields(req:object,schema?:any[]) {
    try {
        
        
        const req_key = Object.keys(req)
        const require_fields = schema?.map(item=>{
            if(!item.required){
                return""
            }
            return item.name
        })
        let ismatch =true
        if(require_fields){
            for(let i =0 ; i<require_fields?.length;i++){
                if(require_fields[i]==''){
                    continue
                }
                const isexist = req_key.some(item=>item==require_fields[i])
                if(!isexist){
                    ismatch=false
                }

            }
        }
       return ismatch
        
       
        

    } catch (error) {
        return false
    }
}