import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allRestaurants: []
};

const restaurantSlice = createSlice({
    name: "restaurants",
    initialState,
    reducers: {
        storeAllRestaurants(state, action) {
            state.allRestaurants=action.payload
        }
    },
})

export const { storeAllRestaurants } = restaurantSlice.actions;

export default restaurantSlice.reducer;