import {ItemEntryForm} from './ItemEntryForm.js';
import {Container} from '../Misc/Container.js';
import React from "react";



const ItemEntry = (props) =>{
    const [showMenu, setShowMenu] = React.useState(false);  
    const [list, setList] = React.useState(props.list);
    const handleSubmit = (value) => {
        let newList = list.slice();
        newList.push(value);
        setList(newList);
        props.report();
    };
    return(
    <>
        <Container direction="row">
            <ItemEntryForm handleSubmit={handleSubmit}/>
            <button onClick={()=> setShowMenu(!showMenu)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
            </svg>
            </button>
        </Container>
        {showMenu? <div>
            {props.buttons.map(item => (
                <button key={item[0]} onClick={item[1]}>{item[0]}</button>  
            )
            )}
        </div>:null}
        

    </>
)};

export {ItemEntry};

