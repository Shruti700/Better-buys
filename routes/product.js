const router=require("express").Router();
//const req = require("express/lib/request");
const Product = require("../models/Product");

//const req = require("express/lib/request");
 const {verifyToken,verifytokenandauthorization,verifytokenandadmin} =require("./verifyToken")

//Create
router.post("/",verifytokenandadmin,async(req,res)=>{
    const newProduct =new Product(req.body);
    try{
        const savedProduct=await newProduct.save();
        res.status(200).json(savedProduct);
    }
    catch(err){
        res.status(500).json(err);
    }
})





//update
router.put("/:id",verifytokenandadmin,async(req,res)=>{
   
   try{
       const updatedproduct = await User.findByIdAndUpdate(req.params.id,{
           $set: req.body,
       },{new:true});
       req.status(200).json(updatedproduct);
   }
   
   catch(err){
       res.status(500).json(err);
   }
});

//delete
router.delete("/:id", verifytokenandadmin, async (req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted")
    }
    catch(err){
        res.status(500).json(err);
    }
});
//get product
router.get("/find/:id", async (req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
        res.status(200).json(product)
        
    }
    catch(err){
        res.status(500).json(err)
    }
});
//get all products
router.get("/", async (req,res)=>{
    const querynew =req.query.new;
    const querycategory =req.query.category;
    try{
        let products;
        if(querynew){
            products=await Product.find().sort({createdAt:-1}).limit(1);
        }
        else if(querycategory){
            products = await Product.find({
                categories:{$in:[querycategory]}
            })
        }
        else{
            products = await Product.find();
        }
        
        res.status(200).json(products);
        //res.status(200).json("User has been deleted")
    }
    catch(err){
        res.status(500).json(err);
    }
});


 module.exports = router;
