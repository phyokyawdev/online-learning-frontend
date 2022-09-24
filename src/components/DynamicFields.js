import { FieldArray, useFormikContext } from "formik";
import React from "react";

/**
 *
 * @param props object
 * @param props.renderArrayItem callback called with (name, index, arrayHelper)
 * @param props.renderArrayAction  callback called with (arrayHelper)
 * @param props.label label for component
 * @param props.name name for FieldArray
 * rest of props will be passed to Formik FieldArray
 */
const DynamicFields = ({
  renderArrayItem,
  renderArrayAction,
  label,
  name,
  ...props
}) => {
  const { values } = useFormikContext();

  return (
    <div className="field">
      <label>{label}</label>
      <FieldArray name={name} {...props}>
        {(arrayHelper) => (
          <div>
            {values[name] &&
              values[name].length > 0 &&
              values[name].map((val, index) =>
                renderArrayItem(`${name}.${index}`, index, arrayHelper)
              )}
            {renderArrayAction(arrayHelper)}
          </div>
        )}
      </FieldArray>
    </div>
  );
};

export default DynamicFields;
