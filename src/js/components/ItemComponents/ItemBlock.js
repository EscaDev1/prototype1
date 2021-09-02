import {Container} from '../Misc/Container.js';

const ItemList = (props) => {
    return(
        <Container direction="column">
        {Array.from(props.map,([key,value])=>value).map((item)=>(
            <Item key={item.id} data={item.data}></Item>
        )
        )}
        </Container>
    )
     
}

const Item = (props) => {
    return(
    <Container direction="row">
    <p>{props.data.item}</p>
    <p>{props.data.category}</p>
    <p>{props.data.quantity}</p>
    <p>{props.data.unit}</p>
    <button type="button">:</button>
    <button type="button">x</button>
    </Container>
    )
}

export {ItemList};