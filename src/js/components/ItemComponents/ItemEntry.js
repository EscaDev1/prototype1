//import {ItemEntryForm} from './ItemEntryForm.js';
import {Container} from '../Misc/Container.js';

import React from "react";

const ItemEComp = (props) => {
    const [item, setItem] = React.useState("");
    const [category, setCategory] = React.useState("");
    const submit = () => {
        props.addItem({item,category});
        setItem("");
        setCategory("");
    }
    return(
        <React.Fragment>
            <input
                type="text"
                value={item}
                onChange={event=>setItem(event.target.value)}
            />
            <select  
            className="category"
            value={category}
            onChange={event=>setCategory(event.target.value)}
            >
                <option  value="">Choose a Category..</option>
                <option value="meat">meat</option>
                <option value="fruit and veg">fruit and veg</option>
                <option value="dairy">dairy</option>
                <option value="fridge">fridge</option>
                <option value="freezer">freezer</option>
                <option value="cupboard">cupboard</option>
                <option value="home">home</option>
            </select>
            <button type="button" onClick={submit}
            >add</button>
        
            
        </React.Fragment>
    )
};



const ItemEntry = (props) =>{
    const [showMenu, setShowMenu] = React.useState(false);  
    return(
    <React.Fragment>
        <Container direction="column">
            <Container direction="column ">
                <ItemEComp addItem={props.addItem} />
                <button type="button" onClick={()=> setShowMenu(!showMenu)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                </svg>
                </button>
            </Container>
            {showMenu? <div>
                {props.buttons.map(item => (
                    <button type="button" key={item[0]} onClick={item[1]}>{item[0]}</button>  
                )
                )}
            </div>:null}
            
        </Container>
        

    </React.Fragment>
)};

export {ItemEntry};

