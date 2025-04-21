import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: null };

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.value = action.payload;
    },
    clearAuthUser: (state) => {
      state.value = null;
    }
  }
});

export const { setAuthUser, clearAuthUser } = authSlice.actions;
export default authSlice.reducer;

