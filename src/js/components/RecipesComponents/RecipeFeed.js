
import React from "react";
import '../../../css/recipeFeed.css';
import styled from "styled-components";
import {getAll} from "../../database/database";
import { useHistory } from "react-router-dom";

const RecipeContainer =  styled.div`
    width: ${props => props.size};
    display: flex;
    flex-wrap:wrap;
    flex-direction: row;
    
`;

const RecipeDiv = styled.div`
    position: relative;
    height: ${props => props.size};
    width:50vw;
    height:50vw;
    background-color: black;
    @media screen and (max-width: 250px) {
        
            width: 125px;
            height:125px
       
    }
    @media screen and (min-width: 700px) {
        
            width: 350px;
            height:350px
        
    }

`;
const RecipeFeed = (props) => {
    const [images, setImages] = React.useState(null);
    const [checked, setChecked] = React.useState(new Map());
    const [selected, setSelected] = React.useState(0);
    const loadImages = ()=>{if (images ===null){
        getAll('recipe_store')
            .then(data=>{
                setImages(data);
                let newMap = new Map();
                for(let i=0;i<data.length;i++){                  
                    newMap.set(data[i].id, false);
                }
                setChecked(newMap);              
            });
        
    }}
    React.useEffect(loadImages);
    const toggleTrue = (id) => {
        let value = checked.get(id);
        console.log(value);
        if(value){
            let newSelected = selected-1;
            setSelected(newSelected);
        }else{
            let newSelected = selected+1;
            setSelected(newSelected);
        }
        console.log(selected);
        let newMap = new Map(checked);
        newMap.set(id, !checked.get(id));
        setChecked(newMap);
        
    }
    const addRecipe = ()=>{
        console.log(images);
        console.log(checked);
    }
    return(
        <RecipeContainer size={props.size+"px"}>
        {images===null ||checked===undefined?null:images.map((item)=>(
            
            <RecipeItem 
            size={props.size/2}
            toggle={toggleTrue}
            key={item.id} 
            id={item.id} 
            image={item.data.image}
            title={item.data.title}
            checked={checked.get(item.id)} 
            selected={selected}
            setTarget={props.targetSetter.bind(null, item)}
            />
            )
        )}
        <button onClick={addRecipe}>add recipe</button>
        </RecipeContainer>
        
    )
}

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

const RecipeItem = (props)=>{
    let timer;
    let history = useHistory();
    return(
        <RecipeDiv size={props.size}
        >
            <Image
            data={props.image}
            size={props.size}
             />
             {props.selected===0?
             <button
             //Onclick to take user to recipe card
             onClick={()=>{props.setTarget();history.push('/recipeCard')}}
             onTouchStart={()=>{timer=setTimeout(()=>{props.toggle(props.id)},1000);}}
             onMouseDown={()=>{timer=setTimeout(()=>{props.toggle(props.id)},1000);}}
             onTouchEnd={()=>clearTimeout(timer)}
             onMouseUp={()=>clearTimeout(timer)}
             className="imgButton"
             ></button>:
             <button
             onMouseDown={()=>{props.toggle(props.id)}}
             className="imgButton"
             ></button>
             }
            {props.selected===0||!props.checked?null:<svg 
            xmlns="http://www.w3.org/2000/svg"
             width={props.size*0.05}
             height={props.size*0.05}
             fill="white" 
             className="bi bi-check2-square checkbox" 
             viewBox="0 0 16 16" >
            <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/>
            <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
            </svg>}
            <p className="recipeTitle">{props.title}</p>
        </RecipeDiv>
    )
}


export{RecipeFeed};