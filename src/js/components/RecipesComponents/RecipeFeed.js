
import {getAll} from "../../database/database";
import React, { useEffect } from "react";
import '../../../css/recipeFeed.css';
import styled from "styled-components";

const RecipeFeed = () => {
    
    const [checked, setChecked] = React.useState(new Map());
    const [images, setImages] = React.useState(null);
   
    const loadImages = ()=>{if (images ===null){
        getAll('recipe_store')
            .then(data=>{
                setImages(data)
                let newMap = new Map(checked);
                for(let i=0;i<data.length;i++){
                    
                    newMap.set(data[i].id, false);
                    setChecked(newMap);
                }
            });
        
    }}
    useEffect(loadImages);

    const toggleTrue = (id) => {
        let newMap = new Map(checked);
        newMap.set(id, true);
        setChecked(newMap);
        console.log(checked);
    }
    return(
        <>
        {images===null?null:images.map((item)=>(
            
            <RecipeItem 
            toggle={toggleTrue}
            key={item.id} 
            id={item.id} 
            image={item.data.image}
            checked={checked} />
            
            
            )
        )}
        </>
    )
}

const Thumbnail = styled.img`
    height: ${props => props.size};
    width: ${props => props.size};
    object-fit: cover;
`;
const Image = (props) => 
    <Thumbnail 
    onClick={console.log.bind(null,"timer strart")}
    size={(props.size)+"px"} 
    alt="Recipe thumbnail" 
    src={props.data} />;

const RecipeItem = (props)=>{
    let timer;
    return(
        <div
        className="recipeItem"
        >
            <Image
            data={props.image}
            size={200}
    
            onTouchStart={()=>{timer=setTimeout(()=>{props.toggle.bind(null,props.id)},1000);}}
            onTouchEnd={()=>clearTimeout(timer)}
             />
            <input 
            value={props.checked.get(props.id)} 
            onChange={props.toggle.bind(null,props.id)} 
            className="checkbox" 
            type="checkbox"/>
        </div>
    )
}
//<RecipeItem image={item.data.image} setTrue={toggleTrue} />

export{RecipeFeed};