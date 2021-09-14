import {ItemEntry} from '../components/ItemComponents/ItemEntry';
import {ItemList} from '../components/ItemComponents/ItemBlock.js';
import {Navbar} from '../components/Misc/NavBar';


const ShoppingList = (props) => {
    

    return(
        <Navbar 
        title={props.list==="default"? "Regular Items":"Shopping List"}
        rightLink="Recipes"
        leftLink={props.list==="default"? "Shopping List":"Regular Items"}
        rightLinkHref="/"
        leftLinkHref={props.list==="default"? "/shoppingList":"/defaultList"}
        >
        <ItemEntry>

        </ItemEntry>
        </Navbar>
    )
}

export {ShoppingList}; 