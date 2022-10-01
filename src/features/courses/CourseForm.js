import { Form, FormikProvider } from "formik";
import React from "react";
import {
  ErrorMessage,
  DynamicFields,
  Field,
  ImageField,
} from "../../common/components";

/**
 * CourseCreate and CourseEdit will have
 * same - validation, errors
 * different - initialValues, onSubmit
 *
 * Lectures logic will be incorporated here
 */

/**
 * Course
 * - cover_photo_link
 * - title
 * - content
 * - tags []
 *
 * Tag
 * - name
 * - courses []
 *
 * Lecture
 * - index
 * - title
 * - url
 * - teacher
 * - course
 */

/**
 * Course
 * - cover_photo_link
 * - title
 * - content
 * - tags [{id, name}]
 * - lectures [{ title, url }]
 */

const CourseForm = ({ formik }) => {
  // name is tags.0 here
  const renderTagsItem = (tag, index, arrayHelper) => {
    const name = `${tag}.name`;
    return (
      <div key={index}>
        <Field name={name} parentClass="ui fluid action input">
          <button
            type="button"
            onClick={() => arrayHelper.remove(index)}
            className="ui button"
          >
            Delete
          </button>
        </Field>
      </div>
    );
  };

  const renderTagsAction = (arrayHelper) => (
    <button
      type="button"
      className="ui primary button"
      onClick={() => arrayHelper.push("")}
    >
      Add
    </button>
  );

  const { values } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <Form className="ui form error">
          <div className="container">
            <ImageField
              name="cover_photo_link"
              src={values.cover_photo_link}
              alt="course image"
              style={{
                width: "300px",
                height: "200px",
              }}
            />
            <Field
              label="Course Title"
              name="title"
              placeholder={values.title}
              parentClass="field"
            >
              <ErrorMessage name="title" />
            </Field>
            <Field
              as="textarea"
              rows="3"
              label="Content"
              name="content"
              placeholder={values.content}
              parentClass="field"
            >
              <ErrorMessage name="content" />
            </Field>
            <DynamicFields
              label="Tags"
              name="tags"
              renderArrayItem={renderTagsItem}
              renderArrayAction={renderTagsAction}
            >
              <ErrorMessage name="tags" />
            </DynamicFields>
          </div>
        </Form>
      </FormikProvider>
    </>
  );
};

export default CourseForm;
