import {Container} from '../Misc/Container.js';
import styled from "styled-components";

const ItemContainer = styled.div`
    border:1px solid;
    border-radius: 5px;
    `


const ItemList = (props) => {
    return(
        <Container direction="column">
        <p>{props.title}</p>
        <ItemContainer>
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

export {ItemList};