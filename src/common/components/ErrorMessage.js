import React from "react";
import { ErrorMessage as FormikErrorMessage } from "formik";

const ErrorMessage = ({ name, ...props }) => {
  return (
    <FormikErrorMessage
      name={name}
      component="div"
      className="ui error message"
      style={{ margin: 0 }}
      {...props}
    />
  );
};

export default ErrorMessage;
