import {configureStore} from "@reduxjs/toolkit";
import authSlice from "../features/auth/slice";
export const store = configureStore({
    reducer:{
        // add all reducers here
        auth: authSlice,
    }
})