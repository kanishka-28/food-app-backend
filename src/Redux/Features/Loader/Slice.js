import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    loading : false
}

const loaderSlice = createSlice({
    name : "loader",
    initialState,
    reducers:{
        setloadingTrue(state,action){
            state.loading = true
        },
        setloadingFalse(state,action){
            state.loading = false
        }
    }
}) 

export const {setloadingTrue, setloadingFalse}  = loaderSlice.actions;

export  default   loaderSlice.reducer;