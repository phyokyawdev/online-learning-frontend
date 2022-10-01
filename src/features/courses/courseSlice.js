import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { imageUpload } from "../../common/util";
import coursesAPI from "./coursesAPI";
import tagsAPI from "./tagsAPI";

const current_course = {
  isSubmitting: false,
  errors: null,
  data: null,
};

const initialState = {
  current_course,
};

/**
 * Internal Helper Functions
 * =========================
 */
const createTag = async (name) => {
  const { data } = await tagsAPI.post("/", { name });
  return data;
};

const createCourseImageUrl = async (image) => {
  const {
    data: { presignedUrl, ...options },
  } = await coursesAPI.get("/image-presigned-url");
  const {
    data: { url },
  } = await imageUpload(image, presignedUrl, options);
  return url;
};

/**
 * Course
 * - cover_photo_link
 * - title
 * - content
 * - tags [{id, name}]
 */

/**
 * Redux Functions
 * ===============
 */
export const uploadCourse = createAsyncThunk(
  "courses/uploadCourse",
  async (values, { rejectWithValue, getState, dispatch }) => {
    let { id, cover_photo_link, title, content, tags } = values;

    tags = await Promise.all(
      tags.map(async (tag) => {
        if (tag.id) return tag.id;

        const createdTag = await createTag(tag.name);
        return createdTag.id;
      })
    );

    const oldCoverPhotoLink =
      getState().courses.current_course.data?.cover_photo_link;
    if (cover_photo_link && cover_photo_link !== oldCoverPhotoLink) {
      cover_photo_link = await createCourseImageUrl(cover_photo_link);
    }

    let method;
    if (id) method = "put";
    else method = "post";

    try {
      const { data: course } = await coursesAPI[method](`/${id || ""}`, {
        cover_photo_link,
        title,
        content,
        tags,
      });

      return course;
    } catch (error) {
      return rejectWithValue({ data: values, errors: error });
    }
  }
);

export const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    flushCurrentCourse: (state) => {
      state.current_course = current_course;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadCourse.pending, (state) => {
        state.current_course.isSubmitting = true;
      })
      .addCase(uploadCourse.fulfilled, (state, action) => {
        state.current_course.data = action.payload;
        state.current_course.isSubmitting = false;
      })
      .addCase(uploadCourse.rejected, (state, action) => {
        state.current_course.data = action.payload.data;
        state.current_course.errors = action.payload.errors;
        state.current_course.isSubmitting = false;
      });
  },
});

export const { flushCurrentCourse } = courseSlice.actions;

/**
 * SELECTORS
 * ========
 */
export const selectCurrentCourse = (state) => state.courses.current_course.data;

export const selectCurrentCourseErrors = (state) =>
  state.courses.current_course.errors;

export const isCurrentCourseCreated = (state) =>
  !!state.courses.current_course.data?.id;

export const selectCurrentCourseId = (state) =>
  state.courses.current_course.data?.id;

export const isCurrentCourseSubmitting = (state) =>
  state.courses.current_course.isSubmitting;

export default courseSlice.reducer;
