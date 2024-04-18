const mongoose=require("mongoose")
const productsSchema=require("../index")
console.log("hello")
const DATABASE=process.env.DATABASE
console.log(DATABASE)
const dbConnect=async()=>{
    try{
        await mongoose.connect(DATABASE);
        console.log("db connected")
    }
    catch(error)
    {
        console.log(error)
    }
    
}
dbConnect()