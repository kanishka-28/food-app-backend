import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false
}

const LoaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers:{
        setloadingTrue(state,action){
            state.isLoading = true
        },
        setloadingFalse(state,action){
            state.isLoading = false
        }
    }
}); 
 
export const {setloadingTrue, setloadingFalse}  = LoaderSlice.actions;

export  default   LoaderSlice.reducer;