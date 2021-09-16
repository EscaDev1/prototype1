import {ItemEntry} from '../components/ItemComponents/ItemEntry';
import {ItemList} from '../components/ItemComponents/ItemBlock.js';
import {Navbar} from '../components/Misc/NavBar';
import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {retrieveData, updateData} from '../database/database';


const ShoppingList = (props) => {
    
    const [list, setList] = React.useState(null);
    const [listName, setListName] = React.useState(()=>{
        if(props.list ==="default"){return "default_list"}else{return "shopping_list"}
    })
    
    useEffect(()=>{
        const update = () => {
            if(props.list ==="default"){
                retrieveData('deafult_list','item_store')
                    .then(data=>setList(data))
                    .catch(e=>console.log(e))
            }else{
                retrieveData('shopping_list','item_store')
                    .then(data=>setList(data))
                    .catch(e=>console.log(e))
            }}
        
        update();  
    },[props.list]);

    const addItem = (item) => {
        if(list!==null){
            let newList = {...list}
            let id = uuidv4();
            newList.looseItems.set(id,{id:id,data:item});
            updateData(listName,newList,'item_store')
                .then(()=>setList(newList));
        }
    }

    const removeItem = (value) => {
        let newList = {...list};
        newList.looseItems.delete(value);
        updateData(listName,newList,'item_store')
                .then(()=>setList(newList));
    };  

   
    return(
        
        <Navbar 
        title={props.list==="default"? "Regular Items":"Shopping List"}
        rightLink="Recipes"
        leftLink={props.list==="default"? "Shopping List":"Regular Items"}
        rightLinkHref="/"
        leftLinkHref={props.list==="default"? "/shoppingList":"/defaultList"}
        >
        <div>
        <ItemEntry addItem={addItem}>

        </ItemEntry>
        <button
        onClick={()=>{console.log(list);}}
        >log</button>
        
        <div>
        {list === null || list.looseItems.size ===0? null:
        <ItemList map={list.looseItems} delete={removeItem} title={"Loose Items"}/>
        }
        {list === null || list.recipes.size === 0? null:
        Array.from(list.recipes,([key,value])=>value).map((item)=>(
            item.data.items.size === 0? null:<ItemList map={item.data.items} delete={()=>console.log("delete recipe item")} title={item.data.title}></ItemList>
        ))
        }
        </div>

        </div>
        </Navbar>
        
    )
}

export {ShoppingList}; 