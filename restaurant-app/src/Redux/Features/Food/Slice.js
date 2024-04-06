import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    open: false
}

const FoodModalSlice = createSlice({
    name: "Food Modal Slice",
    initialState,
    reducers:{
        setOpen(state,action){
            state.open = action.payload
        },
    }
})

export const {setOpen}  = FoodModalSlice.actions;

export default FoodModalSlice.reducer