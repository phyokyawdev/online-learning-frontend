import { useFormikContext } from "formik";
import React from "react";
import ImagePicker from "./ImagePicker";

/**
 * ImageField component to be used in formik context
 * @param props - props object
 * @param props.name - name of formik element
 * @param props.setFieldValue - formik props
 */
const ImageField = ({ name, ...props }) => {
  const { setFieldValue } = useFormikContext();

  return (
    <div className="field">
      <ImagePicker
        handleLoadEnd={(image) => setFieldValue(name, image)}
        className="ui centered medium rounded image"
        {...props}
      />
    </div>
  );
};

export default ImageField;
