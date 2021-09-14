import styled from "styled-components";
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
        <>
        <Image data={props.item.data.image}></Image>
         
        </>
    )
}

export {RecipeCard};