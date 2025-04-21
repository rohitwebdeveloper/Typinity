import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../lib/reducers/authSlice'

export const store = configureStore({
    reducer: {
       auth:authReducer,
    }
})