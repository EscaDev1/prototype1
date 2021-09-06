
import React from "react";
import '../../../css/recipeFeed.css';
import styled from "styled-components";

const RecipeFeed = (props) => {
    
    const [checked, setChecked] = React.useState(props.checked);
    const [selected, setSelected] = React.useState(0);

    const toggleTrue = (id) => {
        let value = checked.get(id);
        if(!value){
            let newSelected = selected-1;
            setSelected(newSelected);
        }else{
            let newSelected = selected+1;
            setSelected(newSelected);
        }
        let newMap = new Map(checked);
        newMap.set(id, !checked.get(id));
        setChecked(newMap);
        
    }
    return(
        <div className="recipeContainer">
        {props.images===null ||checked===undefined?null:props.images.map((item)=>(
            
            <RecipeItem 
            toggle={toggleTrue}
            key={item.id} 
            id={item.id} 
            image={item.data.image}
            title={item.data.title}
            checked={checked.get(item.id)} 
            selected={selected}/>
            )
        )}
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
            size={400}
             />
             {props.selected===0?
             <button
             //Onclick to take user to recipe card
             onClick={()=>{console.log("clikc")}}
             onMouseDown={()=>{timer=setTimeout(()=>{props.toggle(props.id)},1000);}}
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
             width="16" 
             height="16" 
             fill="white" 
             className="bi bi-check2-square checkbox" 
             viewBox="0 0 16 16" >
            <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/>
            <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
            </svg>}
            <p className="recipeTitle">{props.title}</p>
        </div>
    )
}


export{RecipeFeed};