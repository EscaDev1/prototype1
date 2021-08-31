import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import {Container} from '../Misc/Container.js';

const initialValues ={
    item:"",
    category:"",
};

const nameSchema = Yup.object().shape({
    
  });

const ItemForm = ({errors,touched, handleSubmit, values, handleChange, handleBlur})=>(
    
    <Form>
        <Container direction="row">
        <Container direction="column">
            <label htmlFor="item">Item:</label>
            <Field
            id="item"
            type="text"
            name="item"
            placeholder="enter an item..."
            />
        </Container>
        <Container direction="column">
        <label htmlFor="category">Category:</label>
        <select name="category" 
        value={values.category}
        onChange={handleChange}
        onBlur={handleBlur}>
            <option value="">Choose a Category..</option>
            <option value="meat">meat</option>
            <option value="fruit and veg">fruit and veg</option>
            <option value="dairy">dairy</option>
            <option value="fridge">fridge</option>
            <option value="freezer">freezer</option>
            <option value="cupboard">cupboard</option>
            <option value="home">home</option>
        </select>
        </Container>
        <input type="submit" value="Submit" onSubmit={handleSubmit}/>
        </Container>
        
    </Form>
);

const ItemEntryForm = (props) => {
    return(
    <div>
        <Formik
            initialValues={initialValues}
            validationSchema ={nameSchema}
            onSubmit={props.handleSubmit}
            children={ItemForm}
        />
    </div>
 );}
export {ItemEntryForm};