import styled from "styled-components"
import { useSelector } from "react-redux";
import Announcement from "../components/Announcement"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Newsletter from "../components/Newsletter"
import { Add, Remove } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { useNavigate } from "react-router";
import StripeCheckout from "react-stripe-checkout";
import Stripe from "stripe";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeProduct } from "../redux/cartRedux";

const KEY=process.env.REACT_APP_STRIPE;
const Container = styled.div``
const Wrapper = styled.div` padding: 20px;`
const Title = styled.h1`  font-weight: 300;
text-align: center;`
const Top = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding: 20px;`
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
 
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
 
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;

`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  margin:2px;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  const [stripeToken, setStripeToken] = useState(null);
 const history = useNavigate();

const onToken = (token)=>{
  setStripeToken(token)
}

useEffect(()=>{
  const makeRequest=async()=>{
    try{
      const res=await userRequest.post("/checkout/payment",{
        tokenId:stripeToken.id,
        amount:cart.total*100,
      })
      history.push("/success",{data:res.data});
    }
    catch
    {}

    
  }
  stripeToken  && makeRequest()

  
},[stripeToken,cart.total, history])
const dispatch = useDispatch();
const handleClick = () => {
  dispatch(removeProduct()
  );
};

return (
  <Container>
    <Announcement />
    <Navbar />

    <Wrapper>
      <Title>YOUR CART</Title>
      <Top>
        <Link to="/"><TopButton>CONTINUE SHOPPING</TopButton></Link>
        
        
      </Top>
      <Bottom>
      <Info>
            {cart.products.map(product=>(
            <Product>
              <ProductDetail>
                <Image src={product.img} />
                <Details>
                  <ProductName>
                    <b>Product:</b> {product.title}
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> {product.id}
                  </ProductId>
                  <ProductColor color={product.color} />
                  <ProductSize>
                    <b>Size:</b> {product.size}
                  </ProductSize>
                </Details>
              </ProductDetail>
              
              <PriceDetail>
                <ProductAmountContainer>
                  
                  <ProductAmount>Quantity: {product.quantity}</ProductAmount>
                                  </ProductAmountContainer>
                <ProductPrice>Rs {product.price*product.quantity}</ProductPrice>
              </PriceDetail>
            </Product>))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>Rs {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>Rs 59.0</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>Rs -59.0</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>Rs {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
         name="Better Buys"
         image="https://media1.thehungryjpeg.com/thumbs2/ori_3624982_1kw0pzzvzqvw4xg2lbnokbvg0j63p6u1l1m6v6dx_bb-monogram-logo-design.jpg"
         billingAddress
         shippingAddress
         description={`Your total is Rs ${cart.total}`}
         amount={cart.total*100}
         token={onToken}
         stripeKey={KEY}>
            <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
            <Button onClick={()=>handleClick()}>REMOVE ITEMS FROM CART</Button>
        </Summary>
      </Bottom>
    </Wrapper>
    <Newsletter />
    <Footer />
  </Container>
);
  };
export default Cart