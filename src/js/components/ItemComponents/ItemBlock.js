import {Container} from '../Misc/Container.js';
import styled from "styled-components";
import React from 'react';
const ItemContainer = styled.div`
    border:1px solid;
    border-radius: 5px;
    min-height: 300px;
    `


const ItemList = (props) => {
    return(
        <Container direction="column">
        <p>{props.title}</p>
        <ItemContainer >
        {Array.from(props.map,([key,value])=>value).map((item)=>(
            <Item key={item.id} id={item.id}data={item.data} delete={props.delete}></Item>
        )
        )}
        </ItemContainer>
        </Container>
    )
     
}

const fRight = {
    float:"right"
}

const Item = (props) => {
    return(
    <div>
    <p>{props.data.item}</p>
    <p>{props.data.category}</p>
    <p>{props.data.quantity}</p>
    <p>{props.data.unit}</p>
    <button 
    style={fRight}
    type="button" 
    onClick={props.delete.bind(null,props.id)}
    >x</button>
    <button style={fRight}type="button">:</button>
    
    </div>
    )
}

const Button = (props) =>{
    const [showMenu, setShowMenu] = React.useState(false);  
    return(
    <React.Fragment>
        <div className="options-container">
            {showMenu? <div>
                {props.buttons.map(item => (
                    <button type="button" key={item[0]} onClick={item[1]}>{item[0]}</button>  
                )
                )}
            </div>:null}
            <div className={!showMenu?"options-div-hide":"options-div-show"}>
                
                <button 
                type="button" 
                onClick={()=> setShowMenu(!showMenu)}
                className="options-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                </svg>
                </button>
            </div>
            
            
        </div>
        {props.children}

    </React.Fragment>
)};

export {Button,ItemList};