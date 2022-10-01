import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import coursesReducer from "../features/courses/courseSlice";
import lecturesReducer from "../features/lectures/lectureSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: coursesReducer,
    lectures: lecturesReducer,
  },
});
