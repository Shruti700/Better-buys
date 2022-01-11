 import StripeCheckout from "react-stripe-checkout";
import {useState,useEffect} from "react"
const KEY =pk_test_51K9ZtmSJsNft8A2kyK3J9Pb9a5LzSOmDLQ7p9NarRC90sECe3apzmn27AbZHGsi6TD1F94kPQj7xubK0FzLpsEIj00qkLCOTfB
 const Pay=()=>{
     const [stripeToken,setStripeToken]=useState(null)
     const onToken=(token)=>{
         setStripeToken(token);
     };
     useEffect(()=>{
         const makeRequest=async()=>{
             try{
                const res= await axios.post("http://localhost:5000/api/checkout/payment",{
                tokenId:stripeToken.id,
                amount:5000,
             });
             console.log(res.data)
            }
             catch(err){
                 console.log(err);
             }
         }
         stripeToken && makeRequest
     },[stripeToken]);
     return (
         <div style={{
             height:"100vh",
             display:"flex",
             slignItems:"center",
             justifyContent:"center",
         }}>
             <StripeCheckout name="Better Buys" image="https://media1.thehungryjpeg.com/thumbs2/ori_3624982_1kw0pzzvzqvw4xg2lbnokbvg0j63p6u1l1m6v6dx_bb-monogram-logo-design.jpg"
             billingAddress
             shippingAddress
             description="Your total amount is Rs. 50"
             amount={5000}
             token={onToken}
             stripeKey={KEY}>

             <button
             style={{
                 border:"none",
                 width:120,
                 borderRadius:5,
                padding:"20px",
                backgroundColor:"white",
                fontWeight:"600",
                cursor:"pointer",
            }}>
                Pay Now
            </button>
            </StripeCheckout>
         </div>
     )
 }
 export default Pay;