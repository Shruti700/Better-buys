import { Facebook, Instagram,Room,Phone,MailOutline, Pinterest, Twitter, YouTube } from '@material-ui/icons'
import styled from 'styled-components'

const Container = styled.div`
display:flex;`
const Left = styled.div`
flex:1;
display:flex;
flex-direction:column;
padding:20px`
const Logo=styled.h1``
const Desc =styled.p`
margin:20px 0px;
`
const SocialContainer=styled.div`
display:flex;`
const SocialIcon=styled.h1`
width:40px;
height:40px;
border-radius: 50%;
color: black;
background-color: #${(props) => props.color};
display: flex;
align-items: center;
justify-content: center;
margin-right: 20px;
`
const Center = styled.div`
flex:1;
padding: 20px;`
const Title =styled.h3 `margin-bottom: 30px;`
const List =styled.ul`
margin: 0;
padding: 0;
list-style: none;
display: flex;
flex-wrap: wrap;`
const ListItem=styled.li`  width: 50%;
margin-bottom: 10px;`
const Right = styled.div`
flex:1;
padding: 20px;`
const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;



const Footer = () => {
    return (
        <Container>
            <Left>
            <Logo>better buys</Logo>
            <Desc>Lorem ipsum dolor sit amet consectetur 
                adipisicing elit. Cupiditate recusandae c
                onsectetur est eum fugiat quasi vero voluptate
                 maxime. Dolor excepturi deserunt ratione 
                 debitis totam error eaque saepe nostrum 
                 asperiores nisi?</Desc>
                 <SocialContainer>
                     <SocialIcon color="black">
                         <Facebook/>
                     </SocialIcon>
                     <SocialIcon color="black">
                         <Instagram/>
                     </SocialIcon>
                     <SocialIcon color="black">
                         <Twitter/>
                     </SocialIcon>
                     <SocialIcon color="black">
                         <YouTube/>
                     </SocialIcon>
                     <SocialIcon color="black">
                         <Pinterest/>
                     </SocialIcon>
                 </SocialContainer>
            </Left>
            <Center>
            <Title>Pages</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
            </Center>
            <Right>
            <Title>Contact</Title>
        <ContactItem>
          <Room style={{marginRight:"10px"}}/> Harcourt Butler Technical University, Kanpur
        </ContactItem>
        <ContactItem>
          <Phone style={{marginRight:"10px"}}/> +1 234 56 78
        </ContactItem>
        <ContactItem>
          <MailOutline style={{marginRight:"10px"}} /> contact@hbtu.in
        </ContactItem>
            </Right>

        </Container>
    )
}

export default Footer
