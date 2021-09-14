import {FormikRecipeForm} from "../components/RecipesComponents/RecipeForm.js"
import React from "react";

import {RecipeFeed} from '../components/RecipesComponents/RecipeFeed';
import {Navbar} from '../components/Misc/NavBar';


const Recipes = (props) => {
    return(
        <React.Fragment>          
        <Navbar 
        title="Recipe Feed"
        rightLink="New Recipe"
        leftLink="Shopping List"
        rightLinkHref="/newRecipe"
        leftLinkHref="/shoppingList"
        >
            <RecipeFeed size={800}
            targetSetter={props.targetSetter} />
        </Navbar>
        
        </React.Fragment>
    )
}

const NewRecipe = () => {
    return(
        <React.Fragment>
        <Navbar 
        title="New Recipe"
        leftLink="Back"
        leftLinkHref="/"
        >
            <FormikRecipeForm values={null}></FormikRecipeForm>
        </Navbar>
        </React.Fragment>
    )
}





export {Recipes, NewRecipe};

