import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import createLectureAPI from "./lecturesAPI";

/**
 * Lecture
 * - index
 * - title
 * - url
 *
 * = course
 * = teacher
 */

/**
 * current_lectures = {
 *  data: [ {id?, index, title, url} ],
 *  errors: [{ errKey: message }]
 * }
 */

const current_lectures = {
  isSuccessful: false,
  isSubmitting: false,
  data: [],
  errors: [],
};

const initialState = {
  current_lectures,
};

const uploadLecture = async ({ id, courseId, ...body }) => {
  let method = "post";
  if (id) {
    method = "put";
  }
  const lecturesAPI = createLectureAPI(courseId);
  const { data: lecture } = await lecturesAPI[method]("/", body);

  return lecture;
};

export const deleteLectures = createAsyncThunk(
  "lectures/deleteLecture",
  async (values) => {
    await Promise.all(
      values.map(async ({ id, courseId }) => {
        await createLectureAPI(courseId).delete(`/lectures/${id}`);
        return id;
      })
    );
  }
);

export const uploadLectures = createAsyncThunk(
  "lectures/uploadLectures",
  async (values, { rejectWithValue }) => {
    const lectures = await Promise.all(
      values.map(async (lecture, index) => {
        try {
          const createdLecture = await uploadLecture(lecture);
          return { data: createdLecture };
        } catch (error) {
          return { data: lecture, errors: { index, ...error } };
        }
      })
    );

    const errorItems = lectures.filter((lecture) => {
      if (lecture.errors) return true;
      return false;
    });

    if (errorItems.length > 0) {
      console.log(lectures);
      return rejectWithValue(lectures);
    }

    return lectures;
  }
);

export const lectureSlice = createSlice({
  name: "lectures",
  initialState,
  reducers: {
    flushCurrentLectures: (state) => {
      state.current_lectures = current_lectures;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteLectures.fulfilled, (state, action) => {
        // filtered out all the ids included in deleted lectures
        state.current_lectures.data = state.current_lectures.data.filter(
          (item) => !action.payload.includes(item.id)
        );
      })
      .addCase(uploadLectures.pending, (state) => {
        state.current_lectures.isSubmitting = true;
      })
      .addCase(uploadLectures.fulfilled, (state, action) => {
        state.current_lectures.data = action.payload;
        state.current_lectures.isSubmitting = false;
        state.current_lectures.isSuccessful = true;
      })
      .addCase(uploadLectures.rejected, (state, action) => {
        state.current_lectures.data = action.payload.map(
          (lecture) => lecture.data
        );
        state.current_lectures.errors = action.payload.map((lecture) => {
          if (lecture.errors) return lecture.errors;
          return null;
        });

        state.current_lectures.isSubmitting = false;
        state.current_lectures.isSuccessful = false;
      });
  },
});

export const { flushCurrentLectures } = lectureSlice.actions;

/**
 * SELECTORS
 * =========
 */
export const selectInvalidCurrentLectures = (state) =>
  state.lectures.current_lectures.data.filter((lecture) => {
    if (lecture.errors) return true;
    return false;
  });

export const selectCurrentLecturesErrors = (state) =>
  state.lectures.current_lectures.errors;

export const selectCurrentLectures = (state) =>
  state.lectures.current_lectures.data;

export const isCurrentLecturesCreated = (state) =>
  state.lectures.current_lectures.isSuccessful;

export const isCurrentLecturesSubmitting = (state) =>
  state.lectures.current_lectures.isSubmitting;

export default lectureSlice.reducer;
