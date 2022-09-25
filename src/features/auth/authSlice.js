import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { imageUpload } from "../../common/util";
import authAPI from "./authAPI";
import userAPI from "./userAPI";

const current_user = {
  id: "1332322323",
  username: "Phyo Kyaw",
  email: "pk@gmail.com",
  role: "teacher",
  userinfo: {
    socials: [],
  },
};

const initialState = {
  current_user: current_user,
};

export const signIn = createAsyncThunk("auth/signIn", async (auth_code) => {
  const { data } = await authAPI.post("/google", { auth_code });
  return data;
});

export const signOut = createAsyncThunk("auth/signOut", async () => {
  await authAPI.post("/logout");
});

export const updateUserInfo = createAsyncThunk(
  "auth/updateUserInfo",
  async (values, { getState }) => {
    const current_user = getState().auth.current_user;
    let { profile_link, headline, bio, socials } = values;

    if (profile_link !== current_user.userinfo.profile_link) {
      const signUploadRes = await userAPI.get(
        `/${current_user.id}/profile-image-upload`
      );
      const { url, ...uploadOptions } = signUploadRes.data;

      const uploadRes = await imageUpload(profile_link, url, uploadOptions);
      profile_link = uploadRes.data.url;
    }

    const userinfo = { profile_link, headline, bio, socials };
    const { data } = await userAPI.patch(
      `/${current_user.id}/userinfo`,
      userinfo
    );
    return data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.current_user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        state.current_user = action.payload;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.current_user = null;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.current_user = action.payload;
      });
  },
});

export const { setUser } = authSlice.actions;

// selector outside createSlice (use state.auth to access)
export const selectCurrentUser = (state) => state.auth.current_user;
export const isLoggedIn = (state) => !!state.auth.current_user;
export const isTeacher = (state) => state.auth.current_user.role === "teacher";

export default authSlice.reducer;
