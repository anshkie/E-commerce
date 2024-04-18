const mongodb = require("mongodb")
const mongoose=require("mongoose")
const productSchema=new mongoose.Schema(
    {
        name:String,
        price:String,
        category:String,
        userId:String,
        company:String,
        /*productImage: {
            type: String,
            required: true,
          },*/
    }
);
module.exports= mongoose.model("product",productSchema)