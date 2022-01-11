const router=require("express").Router();
//const req = require("express/lib/request");
const Cart = require("../models/Cart");

//const req = require("express/lib/request");
 const {verifyToken,verifytokenandauthorization,verifytokenandadmin} =require("./verifyToken")

//Create
router.post("/",verifyToken,async(req,res)=>{
    const newcart =new Cart(req.body);
    try{
        const savedcart=await newcart.save();
        res.status(200).json(savedcart);
    }
    catch(err){
        res.status(500).json(err);
    }
})





//update
router.put("/:id",verifytokenandauthorization,async(req,res)=>{
   
   try{
       const updatedcart = await User.findByIdAndUpdate(req.params.id,{
           $set: req.body,
       },{new:true});
       req.status(200).json(updatedcart);
   }
   
   catch(err){
       res.status(500).json(err);
   }
});

//delete
router.delete("/:id", verifytokenandauthorization, async (req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart has been deleted")
    }
    catch(err){
        res.status(500).json(err);
    }
});
//get user cart
router.get("/find/:userid", verifytokenandauthorization, async (req,res)=>{
    try{
        const cart=await Cart.findOne({userid:req.params.userid});
        res.status(200).json(cart)
        
    }
    catch(err){
        res.status(500).json(err)
    }
});

//get all
router.get("/",verifytokenandadmin,async(req,res)=>{
    try{
        const carts=await Cart.find();
        res.status(200).json(carts);
    }
    catch(err){
        res.status(500).json(err);
    }
})


 module.exports = router;
