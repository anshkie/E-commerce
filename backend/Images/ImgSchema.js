const mongodb = require("mongodb")
const mongoose=require("mongoose")
const ImgSchema=new mongoose.Schema(
    {
    Image: {
        type: String,
        required: true,
      }
    }
)
module.exports= mongoose.model("image",ImgSchema)