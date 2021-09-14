import { RecipeCard } from "../components/RecipesComponents/RecipeCard"
import {Navbar} from '../components/Misc/NavBar';

const RecipeCardPage = (props) => {
    return(
        <>
        <Navbar 
        title={props.item.data.title}
        leftLink="Back"
        leftLinkHref="/"
        >
            <RecipeCard item={props.item}></RecipeCard>
        </Navbar>
        </>
    )
}
export {RecipeCardPage};