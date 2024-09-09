import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userInfo",
  initialState: {
    username: "",
  },
  reducers: {
    loadUserInfo: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { loadUserInfo } = userSlice.actions;
