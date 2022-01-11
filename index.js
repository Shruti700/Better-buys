const express=require("express");
const app = express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const userRoute = require("./routes/user")
const authRoute=require("./routes/auth");
const product=require("./routes/product");
const cart=require("./routes/cart")
const orders=require("./routes/order");
const stripeRoute=require("./routes/stripe")
const cors = require("cors");

dotenv.config();
mongoose.connect(process.env.mongo_url)
.then(()=>console.log("DB connection successfull"))
.catch((err)=>{console.log(err);});

app.use(cors())
app.use(express.json());
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/products",product);
app.use("/api/cart",cart)
app.use("/api/order",orders);
app.use("/api/checkout",stripeRoute);
//app.get("/api/test",()=>{console.log("test is successfull");});

app.listen(process.env.PORT ||5000,()=>{
    console.log("Backnd server is running");
});