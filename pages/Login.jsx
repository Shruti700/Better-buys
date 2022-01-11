import styled from "styled-components"
import { useState } from "react";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
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
flex-direction: column;
padding:10px;

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
margin:20px 10px 0px 0px;
&:disabled{
  color:green;
  cursor:not-allowed;
}
`
const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };
    return (
        <Container>
            <Wrapper>
            <Title>
                Log in
            </Title>
            <Form>
          <Input
            placeholder="username"
            onChange={(e)=>setUsername(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e)=>setPassword(e.target.value)}
          />
          <Button onClick={handleClick} disabled={isFetching}>
            LOGIN
          </Button>
          
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link>CREATE A NEW ACCOUNT</Link>
        </Form>
        </Wrapper>
        </Container>
    )
}

export default Login