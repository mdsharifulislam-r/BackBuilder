export interface UserType {
    email:string,
    password:string,
    name:string,
    member?:"basic"|"advence"|"premium"
    confirm_password?:string,
    user_id?:string,
    social_login:boolean
}

export interface ProjectType{
    user_id:string,
    project_id:number,
    project_name:string,
    endpoints?:{name:string,primary_id:number}[],
    description:string
}

export interface Endpoints{
    primary_id:number,
    name:string,
    project_id:number,
    // schema?:{
    //     schema_id:number,
    //     primary_id:number,
    //     name:string,
    //     type:string,
    //     required:boolean
    // }
}