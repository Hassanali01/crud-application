import React from "react";
import * as Yup from "yup";

const ValidationSchema = Yup.object({
  companyName: Yup.string().min(3).required("Please enter Company Name."),
  phoneNo: Yup.string().min(10).max(11).required("Invalid Phone no"),
  country: Yup.string().required("Please enter Country"),
  city: Yup.string().required("Please enter City"),
  
});
const departmentValidation=Yup.object({
  department:Yup.string().required("Please enter department")

})
export { ValidationSchema,departmentValidation };
