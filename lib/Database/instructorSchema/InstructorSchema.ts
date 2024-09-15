import mongoose, { Schema } from "mongoose";

export const InstructoScema = new Schema({
    name:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true 
    },
    socialLinks:{
        type:Object,
        
    },
    password:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    courseCollection:{
        type:Array<string>
    },
    intrestTypes:{
        type:Array<String>
    },
    email:{
        type:String,
        required:true
    },
    ratings:Array<Object>,
    students:Array<String>,
    address:Array<String>,
    isAuthor:Boolean
})

