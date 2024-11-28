import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
}
interface AuthState {
  accessToken: string | null;
  user: User | null;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem("userToken"), // Initialize from localStorage
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;

      if (action.payload) {
        localStorage.setItem("access_token", action.payload);
      }
    },
    setUserData: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setAccessToken, setUserData } = authSlice.actions;
export default authSlice.reducer;
