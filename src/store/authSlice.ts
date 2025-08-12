import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  authState: "login" | "register";
  user: {
    _id: String;
    email: String;
    fullName: String;
    phoneNumber: String;
  } | null;
}

const initialState: AuthState = {
  authState: "login",
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setStateAuth: (state, action) => {
      state.authState = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setStateAuth, setUser } = authSlice.actions;

export default authSlice.reducer;
