import {FormikRecipeForm} from "../components/RecipesComponents/RecipeForm.js"
import React from "react";
import {getAll} from "../database/database";
import {RecipeFeed} from '../components/RecipesComponents/RecipeFeed';





  
let initialValues = null;

export default function Recipes(){
    const [images, setImages] = React.useState(null);
    
    const [checked, setChecked] = React.useState(new Map());
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
    return(
        <>
        <FormikRecipeForm values={initialValues}></FormikRecipeForm>
        <RecipeFeed images={images} checked={checked}/>
        </>
    )
}