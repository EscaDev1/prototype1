import styled from "styled-components";
import React from 'react';

const Thumbnail = styled.img`
height: ${props => props.size};
width: ${props => props.size};
object-fit: cover;
`;

const Image = (props) => 
<Thumbnail 

size={"100%"} 
alt="Recipe thumbnail" 
src={props.data} />;

const RecipeCard = (props) => {
    
    return (
        <React.Fragment>
        { props.item!==null?<Image data={props.item.data.image}></Image>:null}
         
        </React.Fragment>
    )
}

export {RecipeCard};