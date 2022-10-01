import { useFormik } from "formik";
import React, { useImperativeHandle, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentCourseId } from "../courses/courseSlice";
import LecturesForm from "./LecturesForm";
import {
  deleteLectures,
  selectCurrentLectures,
  selectCurrentLecturesErrors,
  uploadLectures,
} from "./lectureSlice";

const Lectures = ({ refId }) => {
  const dispatch = useDispatch();
  const courseId = useSelector(selectCurrentCourseId);
  const lectures_errors = useSelector(selectCurrentLecturesErrors);
  const current_lectures = useSelector(selectCurrentLectures);

  const initialValues = {
    lectures: current_lectures || [],
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const { lectures } = values;
      if (courseId) {
        const modifiedLectures = lectures.map((lecture, index) => {
          if (lecture.courseId) return lecture;

          lecture.courseId = courseId;
          lecture.index = index;
          return lecture;
        });

        // deletion
        const pickCreated = (acc, elt) => {
          if (elt.id) acc.push(elt);
          return acc;
        };
        const initials = initialValues.lectures.reduce(pickCreated, []);
        const finalIds = modifiedLectures
          .reduce(pickCreated, [])
          .map((item) => item.id);
        if (initials.length > finalIds.length) {
          const deleteds = initials.filter(
            (item) => !finalIds.includes(item.id)
          );

          dispatch(deleteLectures(deleteds));
        }

        dispatch(uploadLectures(modifiedLectures));
      }
    },
  });

  useEffect(() => {
    if (lectures_errors.length > 0) {
      lectures_errors.forEach((item) => {
        item.title &&
          formik.setFieldError(`lectures.${item.index}.title`, item.title);
        item.url &&
          formik.setFieldError(`lectures.${item.index}.url`, item.url);
      });
    }
  }, [lectures_errors]);

  useImperativeHandle(refId, () => ({
    Submit: async () => {
      await formik.submitForm();
    },
  }));

  return <LecturesForm formik={formik} />;
};

export default Lectures;
