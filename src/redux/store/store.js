import {configureStore} from "@reduxjs/toolkit";
import authSlice from "../features/auth/slice";
import locationSlice from "../features/location/slice";
import restaurantSlice from "../features/restaurants/slice";
export const store = configureStore({
    reducer:{
        // add all reducers here
        auth: authSlice,
        location: locationSlice,
        restaurants : restaurantSlice
    }
})