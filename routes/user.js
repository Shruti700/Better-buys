 const router=require("express").Router();
const req = require("express/lib/request");
const User = require("../models/User");

//const req = require("express/lib/request");
 const {verifyToken,verifytokenandauthorization,verifytokenandadmin} =require("./verifyToken")

router.put("/:id",verifytokenandauthorization,async(req,res)=>{
   if(req.body.password){
       req.body.password = CryptoJS.AES.encrypt(
           req.body.password,
           process.env.PASS_SEC
       ).toString();
   }
   try{
       const updateduser = await User.findByIdAndUpdate(req.params.id,{
           $set: req.body,
       },{new:true});
       req.status(200).json(updateduser);
   }
   
   catch(err){
       res.status(500).json(err);
   }
});

//delete
router.delete("/:id", verifytokenandauthorization, async (req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted")
    }
    catch(err){
        res.status(500).json(err)
    }
});
//get user
router.get("/find/:id", verifytokenandadmin, async (req,res)=>{
    try{
        const user=await User.findById(req.params.id);
        const{password,...others}=user._doc;
        res.status(200).json(others)
        //res.status(200).json("User has been deleted")
    }
    catch(err){
        res.status(500).json(err)
    }
});
//get all user
router.get("/", verifytokenandadmin, async (req,res)=>{
    const query =req.query.new
    try{
        const users=query ? await User.find().sort({_id:-1}).limit(5): await User.find();
       // const{password,...others}=user._doc;
        res.status(200).json(users);
        //res.status(200).json("User has been deleted")
    }
    catch(err){
        res.status(500).json(err);
    }
});

//get user stats
router.get("/stats",verifytokenandadmin,async(req,res)=>{
    const date =new Date();
    const lastyr=new Date(date.setFullYear(date.getFullYear()-1));
    try{
        const data = await User.aggregate([
        {$match:{createdAt: {$gte:lastyr}}},
        {
            $project:{month:{$month:"$createdAt"},},
        }, {
            $group:{
                _id:"$month", total:{$sum:1},
            },
        }  
]); 
res.status(200).json(data);
   }   catch(err){
        res.status(500).json(err);
    }
})
 module.exports = router;
