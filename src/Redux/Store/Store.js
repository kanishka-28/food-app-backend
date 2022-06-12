import {configureStore} from "@reduxjs/toolkit";
import authSlice from "../Features/Auth/Slice";

export const store = configureStore({
    reducer:{
        // add all reducers here
        auth: authSlice,
    }
})