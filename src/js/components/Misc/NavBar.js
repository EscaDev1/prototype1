import styled from "styled-components";
import React from 'react';
const NavbarDiv = styled.div`
    position: fixed;
    display:flex;
    justify-content:space-between;
    flex-direction: row;
    left:0;
    top:0;
    background-color: white ;
    width: 100%;
    height: 50px;
    z-index:100;
    @media screen and (max-width: 250px) {
    
        width: 250px;
    
    }

`;
const NavbarPadder = styled.div `
    height:50px
`;
const TitleText = styled.div `
  
    font-weight: 600;
    font-size: 1.5em;
    margin: 0 auto;
    position:absolute;
    text-align:center;
    top:25%;
    width:100%;
    z-index:101;
    @media screen and (max-width: 450px) {
        font-size: 1.2em;
    }
    @media screen and (max-width: 340px) {
        font-size: 1em;
        top:30%;
    }
    
`;

const Content = styled.div `
    margin: auto;
    display: flex;
    width:100vw;
    background-color: white;
    @media screen and (max-width: 250px) {
        
            width: 250px;
       
    }
    @media screen and (min-width: 700px) {
        
            width: 700px;
        
    }
`;


const link ={
    textDecoration:'none',
    marginLeft:'10px',
    marginRight:'10px',
    paddingTop: '15px',
    marginBottom: '5px',
    fontWeight:'500',
    color: 'black',
    zIndex:'102',
}
const rlink ={
    textDecoration:'none',
    marginLeft:'10px',
    marginRight:'10px',
    paddingTop: '15px',
    marginBottom: '5px',
    fontWeight:'500',
    color: 'black',
    zIndex:'102',
    float:'right',
}



const Navbar = (props) => {
    return(
        <React.Fragment>
        <NavbarDiv>
            {props.leftLink!==undefined?
            <a 
            style={link}
            href={props.leftLinkHref}
            >{props.leftLink}</a>
            :null}
            <TitleText>{props.title}</TitleText>
            {props.rightLink!==undefined?
            <a 
            style={rlink}
            href={props.rightLinkHref}
            >{props.rightLink}</a>
            :null}
        </NavbarDiv>
        <NavbarPadder/>
        <Content>
            {props.children}
        </Content>
        </React.Fragment>    )
}

export {Navbar};