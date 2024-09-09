
import { Schema } from "mongoose";

export  const BookSchema = new Schema({
    name:{
        type:String,
        required:true,
        
    },
    type:{
        type:String,
        required:true
    },
    instructor:{
        type:Object,
        required:true, 
    },
    price:{
        type:String,
        required:true
    },
    level:{
        type:String,
        required:String
    },
    publishDate:{
        type:String,
        required:true
    },
    ratings:Array<Object>,
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }                            

})