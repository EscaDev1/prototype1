//import {ItemEntryForm} from './ItemEntryForm.js';
import {Container} from '../Misc/Container.js';
import {processString} from '../../scripts/amountCalc'
import React, { useState } from "react";
import '../../../css/itemEntry.css';

const ItemEntry = (props) => {
    const [item, setItem] = React.useState("");
    const [category, setCategory] = React.useState("");
    let [amount, setAmount] = useState("");
    let [unit, setUnit] = useState("");
    let [showAmount, setShowAmount] = useState(false);

    const submit = () => {      
        props.addItem({item,category,amount,unit});
        setItem("");
        setCategory("");
        setAmount("");
        setUnit("");
    }
    const updateString = (value) => {
        let processed = processString(value);
        setItem(value);
        setAmount(processed.quantity);
        setUnit(processed.unit);
    }
    return(
        <div className="item-entry-container">
        <div className="flex-row wide">
            <input
                type="text"
                value={item}
                onChange={event=>updateString(event.target.value)}
                className="grow larger-font entry"
                placeholder="Item"
            />
            <button
            type="button"
            onClick={()=>setShowAmount(!showAmount)}
            >AMT</button>
            <select  
            className="category"
            value={category}
            onChange={event=>setCategory(event.target.value)}
            >
                <option  value="">CAT</option>
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
        </div>
        
        {!showAmount?null:
        <AmountEntry 
        amount={amount} setAmount={setAmount}
        unit={unit} setUnit={setUnit}/>
       
        }
        
        
            
        </div>
    )
};


const AmountEntry = (props) => {
   
    return(
        <div className="flex-row">
            <input 
            type="number" 
            value={props.amount} 
            onChange={e=>props.setAmount(e.target.value)}
            placeholder="Amount"
            className="entry grow larger-font"
            />
            <select  
            value={props.unit}
            onChange={event=>props.setUnit(event.target.value)}
            className="entry"
            >
                <option  value="">Unit..</option>
                <option value="g">g</option>
                <option value="kg">kg</option>
                <option value="oz">oz</option>
                <option value="lb">lb</option>
                <option value="ml">ml</option>
                <option value="l">l</option>
                <option value="cup">cup</option>
            </select>
        </div>
    )
}

const Button = (props) =>{
    const [showMenu, setShowMenu] = React.useState(false);  
    return(
    <React.Fragment>
        <Container direction="column">
            <Container direction="column ">
                
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

