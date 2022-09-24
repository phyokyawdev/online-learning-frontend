import React from "react";
import { Field as FormikField } from "formik";

const Field = ({ children, label, parentClass, ...props }) => (
  <div className={parentClass}>
    <label>{label}</label>
    <FormikField {...props} />
    {children}
  </div>
);

export default Field;
