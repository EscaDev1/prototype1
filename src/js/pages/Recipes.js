//import {FormikRecipeForm} from "../components/RecipesComponents/RecipeForm.js"
import {ItemEntry} from '../components/ItemComponents/ItemEntry.js'




let list = [];


let buttons = [
    ["clear list",()=>{list=[];console.log("clear")}],
    
]

const addItem = () => {
    console.log(list);
}

export default function Recipes(){
    
    return(
       <ItemEntry report={addItem} list={list} buttons={buttons}/>
    )
}