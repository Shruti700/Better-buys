import styled from "styled-components"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {register} from "../redux/apiCalls"
const Container=styled.div`
width: 100vw;
height: 100vh;
background: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
  ),
  url("https://wallup.net/wp-content/uploads/2019/09/919282-tropics-scenery-forests-clouds-jungle-nature.jpg")
    center;
background-size: cover;
display: flex;
align-items: center;
justify-content: center;
`
const Wrapper=styled.div`
width: 40%;
padding: 20px;
background-color: white;
`
const Title=styled.h1`
font-size: 24px;
font-weight: 300;
`
const Form=styled.form`
display: flex;
flex-wrap: wrap;
`
const Agreement=styled.span`
font-size: 12px;
margin: 20px 0px;
`
const Input=styled.input`
flex: 1;
min-width: 40%;
margin: 20px 10px 0px 0px;
padding: 10px;
`
const Button=styled.button`
width: 100%;
border: none;
padding: 15px 20px;
background-color: teal;
color: white;
cursor: pointer;
`

const Register = () => {
    
    const [username, setUsername] = useState("");
    const [email, setUseremail] = useState("");
    
  const [password, setPassword] = useState("");
  const { isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();
    const handleClick=(e)=>{
        e.preventDefault();
        register(dispatch,{username,email,password})
    }
    return (
        <Container><Wrapper>
            <Title>
                Create an account
            </Title>
            <Form>
                <Input placeholder="Name"/>
                <Input placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                <Input placeholder="Email" onChange={(e) => setUseremail(e.target.value)}/>
                <Input placeholder="Country" />
                <Input placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                
                <Agreement>
                    By creating an account, I consent to the processing of my personal data in accordance with the <b> PRIVACY POLICY </b>
                </Agreement>
                <Button onClick={handleClick} >
                    Create Account
                </Button>
            </Form>
        </Wrapper>

        </Container>
    )
}

export default Register
