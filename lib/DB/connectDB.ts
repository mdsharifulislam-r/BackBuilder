import mongoose from "mongoose"
let cache = {
    con:{}
}
export const connectDB = async ()=>{
try {
if(!cache.con){
    const con = await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

`)
console.log(con);



cache.con = con.connection


    }
    console.log(cache);

} catch (error) {
    
}
}