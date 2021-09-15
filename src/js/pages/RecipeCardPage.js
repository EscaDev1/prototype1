import { RecipeCard } from "../components/RecipesComponents/RecipeCard"
import {Navbar} from '../components/Misc/NavBar';
import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";

const RecipeCardPage = (props) => {
    let history = useHistory();
    useEffect(()=>{ 
        
        console.log("mount");
        if(props.item === null){
            history.push('/');
        };
        
       
    });
    return(
        <React.Fragment>
        <Navbar 
        title={props.item!==null?props.item.data.title:null}
        leftLink="Back"
        leftLinkHref="/"
        >
            <RecipeCard item={props.item!==null?props.item:null}></RecipeCard>
        </Navbar>
        </React.Fragment>
    )
}
export {RecipeCardPage};


