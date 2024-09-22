import { Schema } from "mongoose";

export const blogSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    publishDate:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    author:{
        type:Object,
        required:true
    },
    tags:{
        type:Array<String>,
        required:true
    },
    comments:Array<Object>
})