
import React, { useState } from "react";
import '../../../css/recipeFeed.css';
import styled from "styled-components";
import {getAll} from "../../database/database";
import { useHistory } from "react-router-dom";
import {retrieveData, updateData} from '../../database/database';

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
    const [shoppingList, setShoppingList] = React.useState({recipes: new Map()});


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

        retrieveData('shopping_list','item_store')
            .then(data=>setShoppingList(data))
            .catch(e=>console.log(e));
        
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
        console.log("adding recipes");
        retrieveData('shopping_list','item_store')
                    .then(data=>thenAddRecipes(data))
                    .catch(e=>console.log(e))
    }
    const doNowt = ()=>{
        
    }
    const thenAddRecipes = (data)=>{
        let shoppingList = data
        for(let i = 0;i<images.length;i++){
            if(checked.get(images[i].id)===true){
                console.log(images[i]);
                shoppingList.recipes.set(images[i].id,images[i]);
            }
        }
        updateData("shopping_list",shoppingList,'item_store')
                .then(()=>console.log("updated"));
    }
    return(
        <div>
        <RecipeContainer size={props.size+"px"}>
        {images===null ||checked===undefined?null:images.map((item)=>(
            
            <RecipeItem 
            size={props.size/2}
            toggle={shoppingList.recipes.has(item.id)?doNowt:toggleTrue}
            key={item.id} 
            id={item.id} 
            image={item.data.image}
            title={item.data.title}
            checked={checked.get(item.id)} 
            selected={selected}
            setTarget={props.targetSetter.bind(null, item)}
            inList={shoppingList.recipes.has(item.id)}
            />
            )
        )}
        
        </RecipeContainer>
        <button onClick={addRecipe}>add recipe</button>
        </div>
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
    const [change, setChange] = useState(false);
    const [load, setLoad] = useState(true);
    const changeButton = () => {
       if(change === true){
           props.toggle(props.id);
           setChange(false);
           setLoad(false);       }
    }
    const loadRecipe = ()=>{
        if(load){
            props.setTarget();history.push('/recipeCard');
        }
        else{
            setLoad(true);
        }
    }
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
             onClick={()=>{loadRecipe()}}
             onTouchStart={()=>{timer=setTimeout(()=>{props.toggle(props.id)},1000);}}
             onMouseDown={()=>{timer=setTimeout(()=>{props.toggle(props.id)},1000);}}
             onTouchEnd={()=>clearTimeout(timer)}
             onMouseUp={()=>clearTimeout(timer)}
             className="imgButton"
             ></button>:
             <button
             onMouseDown={()=>{setChange(true)}}
             onMouseUp={()=>{changeButton()}}
             className="imgButton"
             ></button>
             }
             {props.inList?
                <svg xmlns="http://www.w3.org/2000/svg" width={props.size*0.05}
                height={props.size*0.05} fill="white" className="bi bi-cart-check shoppingCart" viewBox="0 0 16 16">
                <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                </svg>:null}
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