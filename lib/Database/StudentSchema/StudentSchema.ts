import { Schema } from "mongoose";

export const StudentSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
     
    },
    password:{
        type:String,
       
    },
    isSocialLogin:{
        type:Object
    },
    courseCollections:{
        type:Array<Object>
    },
    pendingCourses:{
        type:Array<Object>
    },
    intrestTypes:{
        type:Array<String>
    },
    completeVideos:Array<String>,
    address:Array<String>,
    diamond:Number

})