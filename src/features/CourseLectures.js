import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Course } from "./courses";
import { Lectures } from "./lectures";
import CourseLecturesLayout from "./CourseLecturesLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  flushCurrentLectures,
  isCurrentLecturesCreated,
  isCurrentLecturesSubmitting,
} from "./lectures/lectureSlice";
import {
  flushCurrentCourse,
  isCurrentCourseCreated,
  isCurrentCourseSubmitting,
} from "./courses/courseSlice";

const CourseLectures = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const courseRef = useRef();
  const lecturesRef = useRef();

  const isCourseCreated = useSelector(isCurrentCourseCreated);
  const isLecturesCreated = useSelector(isCurrentLecturesCreated);
  const isCourseSubmitting = useSelector(isCurrentCourseSubmitting);
  const isLecturesSubmitting = useSelector(isCurrentLecturesSubmitting);

  useEffect(() => {
    if (isCourseCreated) {
      const f = async () => {
        await lecturesRef.current.Submit();
      };

      if (isCourseCreated && !isLecturesCreated) f();
      if (isCourseCreated && isLecturesCreated) {
        dispatch(flushCurrentCourse());
        dispatch(flushCurrentLectures());
        navigate("/profile");
      }
    }
  }, [isCourseSubmitting, isCourseCreated, isLecturesCreated]);

  const handleSubmit = async () => {
    await courseRef.current.Submit();
  };

  const actions = (
    <>
      <div className="ui divider"></div>
      <button
        disabled={isCourseSubmitting || isLecturesSubmitting}
        onClick={handleSubmit}
        type="button"
        className="ui right floated primary button"
      >
        Submit
      </button>
      <button
        disabled={isCourseSubmitting || isLecturesSubmitting}
        onClick={() => {
          dispatch(flushCurrentCourse());
          dispatch(flushCurrentLectures());
          navigate("/profile");
        }}
        type="button"
        className="ui right floated button"
      >
        Cancel
      </button>
    </>
  );

  const formOne = <Course refId={courseRef} />;
  const formTwo = <Lectures refId={lecturesRef} />;

  return (
    <CourseLecturesLayout
      formOne={formOne}
      formTwo={formTwo}
      actions={actions}
    />
  );
};

export default CourseLectures;
