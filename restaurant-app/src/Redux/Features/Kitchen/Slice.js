import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allKitchens: []
};

const kitchenSlice = createSlice({
    name: "kitchens",
    initialState,
    reducers: {
        storeAllKitchens(state, action) {
            state.allKitchens=action.payload
        }
    }, 
})

export const { storeAllKitchens } = kitchenSlice.actions;

export default kitchenSlice.reducer;