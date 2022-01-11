import  styled from "styled-components"

const Container=styled.div`
height:30px;
background-color:teal;
color:white;
text-align:center;
`

const Announcement = () => {
    return (
        <Container>
            Super Deal!! Over 30% off on orders over ₹500. Grab Fast!!!
        </Container>
    )
}

export default Announcement
