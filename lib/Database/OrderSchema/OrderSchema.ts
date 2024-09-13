import { Schema } from "mongoose";

export const OrderSchema = new Schema({
    userId:{
        type:String,
        required:true
    },
    orders:Array<Object>,
    orderDate:String,
    address:String,
    price:Number,
    status:String
})