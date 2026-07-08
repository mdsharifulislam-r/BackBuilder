export async function generateTableSyntex(schema:{name:string,type:string,required:boolean}[],tablename:string) {
    try {
       
        let str = 'primary_id int  not null AUTO_INCREMENT,PRIMARY KEY (primary_id), '
        schema.forEach(item=>{
            let temp=''
            temp+=` ${item.name} `
            if(item.type=='integer'){
                temp+='int, '
            }else if(item.type=='string'){
                temp+='varchar(256), '
            }
            else if(item.type=='boolean'){
                temp+='boolean, '
            }else if(item.type=='float'){
                temp+='float, '
            }else{
                temp+='varchar(256), ' 
            }
            str+=temp
            temp=''
        })
        const string = str.slice(0,str.length-2)
        const tablesyntex = `CREATE TABLE ${tablename} (${string})`
        return tablesyntex
        
        
    } catch (error) {
        console.log(error);
        
    }
}