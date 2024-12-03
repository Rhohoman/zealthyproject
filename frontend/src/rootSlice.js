import { createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    password: "",
    aboutMe: "",
    address: "",
    birthday: "",
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setAboutMe: (state, action) => {
      state.aboutMe = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setBirthday: (state, action) => {
      state.birthday = action.payload;
    },
  },
});

export const reducer = rootSlice.reducer;

export const { setEmail, setPassword, setAboutMe, setAddress, setBirthday } =
  rootSlice.actions;
