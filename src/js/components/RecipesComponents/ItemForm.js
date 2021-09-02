import {ItemEntry} from '../ItemComponents/ItemEntry.js';
import {ItemList} from '../ItemComponents/ItemBlock.js';
import { v4 as uuidv4 } from 'uuid';
import React from "react";





let ItemField = (props) => {
    
    const [map, setMap] = React.useState(props.value);



    const addItem = (value) => {
        let newMap = new Map(map);
        let id = uuidv4()
        newMap.set(id,{id:id,data:value})
        setMap(newMap);
    };
    const removeItem = (value) => {
      let newMap = new Map(map); 
    };

    const buttons = [
        ["clear list",()=>{setMap(new Map());}],
        //add conversion bits if needed
    ]

    return(
        <>
            <ItemEntry buttons={buttons} addItem={addItem}/>
            <ItemList map={map}></ItemList>
        </>
    )
} ;





export {ItemField};