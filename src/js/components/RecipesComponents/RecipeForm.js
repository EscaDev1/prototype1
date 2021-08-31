import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import React from "react";
import {FileField} from "./ImageForm.js"
import styled, {css} from "styled-components";

const Container = styled.div`
    display:flex;
    flex-direction: ${props=>props.direction};
    ${props => props.grow && css`
        flex-grow:1;
    `}
`;

const initialValues ={
    image:"",
    title:"",
    description:"",
    time:"",
    timeUnit:"",
    serves:"",

   
}

const nameSchema = Yup.object().shape({
    
  });

    
 const handleSubmit = values => {
     console.log(values);
 };

 const RecipeForm = ({errors,touched, handleSubmit}) => (
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
                <input
                id="title"
                type="text"
                name="title"
                placeholder="title"
                />
                
                <label htmlFor="title">Description:</label>
                <input
                id="description"
                type="text"
                name="description"
                placeholder="description"
                />

                <label htmlFor="time">Time to cook:</label>
                <Container direction="row">
                    <input
                    id="time"
                    type="number"
                    name="time"
                    placeholder="0"
                    />
                    <select name="timeUnit" default="hours">
                        <option value="hours">Hours</option>
                        <option value="minutes">Minutes</option>
                    </select>
                </Container>
                <label htmlFor="serves">Serves:</label>

                <input
                id="serves"
                type="number"
                name="serves"
                placeholder="0"
                />
            </Container>

        </Container>
        
        <input type="submit" value="Submit" onSubmit={handleSubmit} />
    </Form>
 );

 export const FormikRecipeForm = () => (
    <div>
        <Formik
            initialValues={initialValues}
            validationSchema ={nameSchema}
            onSubmit={handleSubmit}
            children={RecipeForm}
        />
    </div>
 )