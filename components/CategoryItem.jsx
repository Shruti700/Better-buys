import { Link } from 'react-router-dom';
import  styled from 'styled-components';

const Container=styled.div`flex:1;
margin:3px;
height:50vh;
position:relative;`;
const Image=styled.img`width:100%;
height:100%;
object-fit:cover;`;
const Info=styled.div`
position:absolute;
width:100%;
height:100%;
top:70%;
left:0;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
`;
const Title=styled.h1`
color:black;
font-weight:6000;
margin-bottom:20px;`;
const Button=styled.button`
font-weight:600;
border:none;
padding:10px;
cursor:pointer;
background-color:coral;
color:black;`;

const CategoryItem = ({item}) => {
    return (
        <Container>
             <Link to={`products/${item.cat}`}>
                <Image src={item.img}/>
                <Info>
                    <Title>
                    {item.title}
                    </Title>
                    <Button>SHOP NOW</Button>
                </Info>
              
                </Link>
                
        </Container>
        
    )
}

export default CategoryItem


