import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import React, { useEffect, useState, useRef } from "react";
import {FileField} from "./ImageForm"
import {ItemField} from "../ItemComponents/ItemField"
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

 const RecipeForm = ({errors,touched, handleSubmit, values, handleChange, handleBlur}) => {
    const handleScroll = () =>{
        console.log("scroll");
    }
    const [stuck, setStuck] = useState(false);
    return (
    <Form 
    className="width-scalable"
    onScroll={handleScroll}>
        
            <div
                
                className="recipe-form-container">
                
                <div className="recipe-form-image">
                    <Field 
                    name="image"  
                    component={FileField}
                    
                    />
                </div>
                
                <div className="padder"></div>
                <div className={!stuck?"recipe-form-text-unstuck":"recipe-form-text-stuck"}>
                
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
                </div>

        </div>
        <div className="item-entry">
        <Field name="items" component={ItemField} />
        </div>
        <div className="recipe-form-bottom-padder"></div>
        <input style={submitButton} type="submit" value="Submit" onSubmit={handleSubmit} />
    </Form>
 );}

const submitButton = {
    position:'fixed',
    bottom:'0',
    left:'0',
    margin:'auto',
    width:'100%',
    height:'30px',
    backgroundColor:'lightgray',
    border:'none',
    zIndex:'10'
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

