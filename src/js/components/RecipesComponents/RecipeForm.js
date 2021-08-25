import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import React from "react";
import {FileField} from "./ImageForm.js"

const initialValues ={
    image:"",
   
}

const nameSchema = Yup.object().shape({
    image: Yup.string().required("Required"),
  });

    
 const handleSubmit = values => {
     console.log(values);
 };

 const RecipeForm = ({errors,touched, handleSubmit}) => (
    <Form>
        <Field name="image" size="400" component={FileField}/>
        {errors.image && touched.image ? (
            <div>{errors.image}</div>
        ):null}
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