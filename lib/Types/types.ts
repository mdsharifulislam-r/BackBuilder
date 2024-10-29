import { endpoint } from "@/components/singleEndPoint/Table/TableRow"

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
    endpoints?:endpoint[],
    description:string,
    origins?:string
}

export interface Endpoints{
    primary_id:number,
    name:string,
    project_id:number,
    is_user:boolean
    // schema?:{
    //     schema_id:number,
    //     primary_id:number,
    //     name:string,
    //     type:string,
    //     required:boolean
    // }
}