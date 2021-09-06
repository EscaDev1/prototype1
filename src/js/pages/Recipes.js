import {FormikRecipeForm} from "../components/RecipesComponents/RecipeForm.js"

import {RecipeFeed} from '../components/RecipesComponents/RecipeFeed';





  
let initialValues = null;

export default function Recipes(){
    
    return(
        //<FormikRecipeForm values={initialValues}></FormikRecipeForm>
       <RecipeFeed/>
    )
}