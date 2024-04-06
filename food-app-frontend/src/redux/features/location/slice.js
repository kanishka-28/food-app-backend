import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    longitude:null,
    latitude:null,
    ready:false
}

const locationSlice = createSlice({
    name:'location',
    initialState,
    reducers:{
        setLocation(state,action){
            state.ready = true;
            state.longitude = action.payload.longitude;
            state.latitude = action.payload.latitude;
        }

    }
})

export const {setLocation} = locationSlice.actions;

export default locationSlice.reducer;