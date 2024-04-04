import {configureStore} from "@reduxjs/toolkit";
import authSlice from "../Features/Auth/Slice";
import FoodModalSlice from "../Features/Food/Slice";
import loaderSlice from "../Features/Loader/Slice";
import restaurantSlice from "../Features/Restaurant/Slice";

export const store = configureStore({
    reducer:{
        // add all reducers here
        auth: authSlice,
        restaurants: restaurantSlice,
        loader: loaderSlice,
        foodModal: FoodModalSlice,
    }
})