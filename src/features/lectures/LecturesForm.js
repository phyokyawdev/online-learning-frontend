import { Form, FormikProvider } from "formik";
import React from "react";
import { DynamicFields, ErrorMessage, Field } from "../../common/components";

const LecturesForm = ({ formik }) => {
  const renderLecturesItem = (name, index, arrayHelper) => {
    return (
      <div key={index} className="ui center aligned clearing segment item">
        <a
          onClick={() => arrayHelper.remove(index)}
          className="ui right floated icon"
          style={{ float: "right", cursor: "pointer", marginBottom: "-20px" }}
        >
          <i className="close icon"></i>
        </a>
        <div className="content">
          <div className="description">
            <Field name={`${name}.id`} type="hidden" />
            <Field
              name={`${name}.title`}
              label="Lecture Title"
              parentClass="inline field"
              className="ten wide field"
            >
              <ErrorMessage name={`${name}.title`} />
            </Field>

            <Field
              as="textarea"
              rows="1"
              name={`${name}.url`}
              label="Lecture URL "
              parentClass="inline field"
              className="ten wide field"
            >
              <ErrorMessage name={`${name}.url`} />
            </Field>
          </div>
        </div>
      </div>
    );
  };

  const renderLecturesAction = (arrayHelper) => (
    <button
      type="button"
      onClick={() => arrayHelper.push({ title: "", url: "" })}
      className="fluid ui bottom attached primary button"
    >
      + Add Lectures
    </button>
  );
  return (
    <FormikProvider value={formik}>
      <Form className="ui form error">
        <div className="ui container">
          <div className="ui divided items">
            <DynamicFields
              label="Lectures"
              name="lectures"
              renderArrayItem={renderLecturesItem}
              renderArrayAction={renderLecturesAction}
            />
          </div>
        </div>
      </Form>
    </FormikProvider>
  );
};

export default LecturesForm;
