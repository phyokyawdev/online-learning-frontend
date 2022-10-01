import React, { useImperativeHandle } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import CourseForm from "./CourseForm";
import {
  uploadCourse,
  selectCurrentCourseErrors,
  selectCurrentCourse,
  isCurrentCourseCreated,
} from "./courseSlice";

const Course = ({ refId }) => {
  const dispatch = useDispatch();

  const errors = useSelector(selectCurrentCourseErrors);
  const isCreated = useSelector(isCurrentCourseCreated);
  const initialValues = useSelector(selectCurrentCourse) || {
    cover_photo_link: "",
    title: "",
    content: "",
    tags: [],
  };

  const formik = useFormik({
    initialValues,
    validate: (values) => {
      const errors = {};
      if (!values.title) errors.title = "title can't be empty";
      if (!values.content) errors.content = "content can't be empty";
      return errors;
    },
    onSubmit: async (values, actions) => {
      if (isCreated) {
        values.id = initialValues.id;
      }
      dispatch(uploadCourse(values));

      if (errors) {
        return actions.setErrors(errors);
      }
    },
  });

  // expose Submit function of refId to parent
  useImperativeHandle(refId, () => ({
    Submit: async () => {
      await formik.submitForm();
    },
  }));

  return <CourseForm formik={formik} />;
};

export default Course;
