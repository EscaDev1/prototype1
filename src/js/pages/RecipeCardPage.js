import { RecipeCard } from "../components/RecipesComponents/RecipeCard"
import {Navbar} from '../components/Misc/NavBar';
import React from 'react';
const RecipeCardPage = (props) => {
    return(
        <React.Fragment>
        <Navbar 
        title={props.item.data.title}
        leftLink="Back"
        leftLinkHref="/"
        >
            <RecipeCard item={props.item}></RecipeCard>
        </Navbar>
        </React.Fragment>
    )
}
export {RecipeCardPage};