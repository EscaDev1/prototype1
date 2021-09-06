import styled from "styled-components";

const Header = styled.div`
    height:20px
    background-color:grey

`;
const Footer = styled.div`
    height:20px
    background-color:grey

`;

const AppFrame = (props) => {
    return(
        <>
        <Header/>
        {props.childen}
        <Footer/>
        </>
    )
}