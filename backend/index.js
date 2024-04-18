const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mongodb = require("mongodb");
const bodyParser=require("body-parser");
const multer=require("multer");

const Img = require("./Images/ImgSchema");
require('dotenv').config();
require("./config/dbConnect");
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

const User = require("./userSchema/user");
const Product = require("./productSchema/product");
/*const storage=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,path.join(__dirname,'./Images/productImages'),function(err,success){
      if(err){
        throw err
      }
    });
  },
  filename:function(req,file,cb){
    const name=Data.now()+'-'+file.originalname;
    cb(null,name,function(error,success){
      if(error)
      {
        throw error
      }
    })
  }
})*/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../../frontend/src/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() 
    cb(null, uniqueSuffix+file.originalname)
  }
})

const upload = multer({ storage: storage })

app.post('/upload-images', upload.single('Image'), async(req, res) => 
{
  // 4
  console.log("yo")
  console.log(req.body)
  
  const imageName=req.file.filename
  console.log(imageName)
  try{
    await Img.create({Image:imageName})
    res.json({status:"ok"})
  }
  catch(error)
  {
    res.json({status:error})
  }
  /*const product = new Product({
    imageName: req.file.filename,
    description: req.body.description
  });

  // Save this data to a database probably

  console.log(product.description, product.imageName);
  res.send({ description: product.description, imageName: product.imageName });
*/});
app.get("/get-image",async(req,res)=>{
  try{
    Img.find({}).then((data)=>{
      res.send({status:"ok",data:data})
    });
  } catch(error){
    res.json({status:error});
  }
})
app.post("/register", async (req, res) => {
  const user = new User(req.body);
  const result = await user.save();
  //result=result.toObject();
  //delete result.password
  res.send(result);
});
app.post("/login", async (req, res) => {
  /*console.log(req.body)
   */ let user = await User.findOne(req.body).select("-password");

  if (req.body.password && req.body.email) {
    if (user) {
      res.send(user);
    } else {
      res.send({ result: "user does not exist" });
    }
  } else {
    
    res.send({ result: "fill all" });
  }
});
app.post("/add-product", async (req, res) => {
  let product = new Product(req.body);

  let result = await product.save();
  res.send(result);
});
app.get("/product-list", async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);

  } else {

    res.send({ result: "No Products Found" });
  }
});
app.delete("/delete/:id", async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});
app.get("/product-list/:id", async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No found" });
  }
  

});
app.put("/update/:id", async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  if (result) {
    res.send(result);


  } else {
    res.send({ result: "want more" });
  }
});
app.get("/search/:key",async(req,res)=>{
  let result=await Product.find({
    "$or":[
      {name:{$regex:req.params.key}},
    {category:{$regex:req.params.key}},
      {company:{$regex:req.params.key}}

      
    ]
  })
  res.send(result)

})
app.get("/profile/:id",async(req,res)=>{
  let result=await User.findOne({_id:req.params.id});
  if(result)
  {
    res.send(result)
  }
})

//const upload = multer({storage:storage})
app.listen(9100, () => {

  console.log("port is running");

});
