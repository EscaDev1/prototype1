import {ItemEntry} from './ItemEntry.js';
import {ItemList, Button} from './ItemBlock.js';
import { v4 as uuidv4 } from 'uuid';
import React from "react";





let ItemField = ({name,value, setFieldValue}) => {
    
    const [map, setMap] = React.useState(value);

    React.useEffect(() => {
        name && setFieldValue && setFieldValue(name, map);
      }, [name, map, setFieldValue]);

    const addItem = (value) => {
        let newMap = new Map(map);
        let id = uuidv4()
        newMap.set(id,{id:id,data:value})
        setMap(newMap);
    };
    const removeItem = (value) => {
        let newMap = new Map(map); 
        newMap.delete(value);
        setMap(newMap);
    };  

    const buttons = [
        ["clear list",()=>{setMap(new Map());}],
        //add conversion bits if needed
    ]

    return(
        <React.Fragment>
            <ItemEntry addItem={addItem}/>
            <Button buttons={buttons}>
            <ItemList map={map} delete={removeItem} title={"Ingredients"}></ItemList>
            </Button>
        </React.Fragment>
    )
} ;


const withField = Component => ({ field, form, ...props }) => (
    <Component {...field} {...form} {...props} />
  );

ItemField = withField(ItemField);
export {ItemField};