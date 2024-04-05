import {configureStore} from "@reduxjs/toolkit";
import authSlice from "../Features/Auth/Slice";
import FoodModalSlice from "../Features/Food/Slice";
import loaderSlice from "../Features/Loader/Slice";
import restaurantSlice from "../Features/Restaurant/Slice";
import kitchenSlice from "../Features/Kitchen/Slice";

export const store = configureStore({
    reducer:{
        // add all reducers here
        auth: authSlice,
        restaurants: restaurantSlice,
        kitchens: kitchenSlice,
        loader: loaderSlice,
        foodModal: FoodModalSlice,
    }
})