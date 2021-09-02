import {FormikRecipeForm} from "../components/RecipesComponents/RecipeForm.js"







  
let initialValues = null;

export default function Recipes(){
    
    return(
        <FormikRecipeForm values={initialValues}></FormikRecipeForm>
       
    )
}