import React from "react";
import { Link } from "react-router-dom";

// own course will create formik with useFormik
// use TwoFormLayout to render both course and lectures
// pass formik to course and lectures

// course and lectures componenet will use passed formik with FormikProvider
const OwnCourses = () => {
  return <Link to="/own-courses/create">Create Course</Link>;
};

export default OwnCourses;
