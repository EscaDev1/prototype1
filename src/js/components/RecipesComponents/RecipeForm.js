import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import React from "react";

const initialValues ={
    recipeTitle:"",
    description:"",
    recipeTime:"",
    timeUnit:"hours",
    image:"",
    items:""
}

const nameSchema = Yup.object().shape({
    recipeTitle: Yup.string().required("Required")
  });

    
 