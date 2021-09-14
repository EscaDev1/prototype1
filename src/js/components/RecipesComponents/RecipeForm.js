import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import React from "react";
import {FileField} from "./ImageForm"
import {Container} from '../Misc/Container';
import {ItemField} from "./ItemField"
import {storeData} from "../../database/database";
import { v4 as uuidv4 } from 'uuid';
import '../../../css/recipeForm.css';

const initialValues ={
    image:"",
    title:"",
    description:"",
    time:"",
    timeUnit:"hours",
    serves:"",
    items:new Map(),
}

const nameSchema = Yup.object().shape({
    
  });

    
 const handleSubmit = (values,{resetForm}) => {
    let id = uuidv4();
    storeData({id:id, data:values},'recipe_store')
        .then(()=>{
            console.log(values);
            resetForm();
            window.location.href = '/';  
        })
        .catch(e=>console.log(e));
        
     
 };

 const RecipeForm = ({errors,touched, handleSubmit, values, handleChange, handleBlur}) => (
    <Form className="width-scalable">
        
            <Container direction="column">
                
                <p htmlFor="image">Thumbnail:</p>
                <Field name="image"  component={FileField}/>
                {errors.image && touched.image ? (
                    <div>{errors.image}</div>
                ):null}
                
            
            
                <label htmlFor="title" >Title:</label>
                <Field
                id="title"
                type="text"
                name="title"
                placeholder="title"
                />
                
                <label htmlFor="title">Description:</label>
                <Field
                id="description"
                type="text"
                name="description"
                placeholder="description"
                />

                <label htmlFor="time">Time to cook:</label>
                
                    <Field
                    id="time"
                    type="number"
                    name="time"
                    placeholder="0"
                    />
                    <select name="timeUnit" 
                    default="hours" 
                    value={values.timeUnit}
                    onChange={handleChange}
                    onBlur={handleBlur}>
                        <option value="hours">Hours</option>
                        <option value="minutes">Minutes</option>
                    </select>
               
                <label htmlFor="serves">Serves:</label>

                <Field
                id="serves"
                type="number"
                name="serves"
                placeholder="0"
                />
   

        </Container>
        <div className="item-entry">
        <Field name="items" component={ItemField} />
        </div>
        <input style={submitButton} type="submit" value="Submit" onSubmit={handleSubmit} />
    </Form>
 );

const submitButton = {
    position:'fixed',
    bottom:'0',
    margin:'auto',
    width:'100%',
    height:'30px',
    backgroundColor:'lightgray',
    border:'none',
}



 export const FormikRecipeForm = (props) => (
    <React.Fragment>
        <Formik
            initialValues={props.values===null?initialValues:props.values}
            validationSchema ={nameSchema}
            onSubmit={handleSubmit}
            children={RecipeForm}
        />
    </React.Fragment>
 )

