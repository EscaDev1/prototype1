import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import React from "react";
import {FileField} from "./ImageForm"
import {Container} from '../Misc/Container';
import {ItemField} from "./ItemForm"

const initialValues ={
    image:"",
    title:"",
    description:"",
    time:"",
    timeUnit:"hours",
    serves:"",
    items:[]
}

const nameSchema = Yup.object().shape({
    
  });

    
 const handleSubmit = values => {
     console.log(values);
 };

 const RecipeForm = ({errors,touched, handleSubmit, values, handleChange, handleBlur}) => (
    <Form>
        <Container direction="row">
            <Container direction="column">
                <label htmlFor="image">Thumbnail:</label>
                <Field name="image" size="400" component={FileField}/>
                {errors.image && touched.image ? (
                    <div>{errors.image}</div>
                ):null}
            </Container>
            
            <Container grow direction="column">
                <label htmlFor="title">Title:</label>
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
                <Container direction="row">
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
                </Container>
                <label htmlFor="serves">Serves:</label>

                <Field
                id="serves"
                type="number"
                name="serves"
                placeholder="0"
                />
            </Container>

        </Container>
        <ItemField value={new Map()}/>
        <input type="submit" value="Submit" onSubmit={handleSubmit} />
    </Form>
 );

 export const FormikRecipeForm = (props) => (
    <div>
        <Formik
            initialValues={props.values===null?initialValues:props.values}
            validationSchema ={nameSchema}
            onSubmit={handleSubmit}
            children={RecipeForm}
        />
    </div>
 )