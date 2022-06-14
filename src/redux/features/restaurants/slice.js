import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    allRestaurants: []
}

// export const getRestaurants = createAsyncThunk('restaurant/get', async ()=>{

// })

const restaurantSlice = createSlice({
    name:'restaurant',
    initialState,
    reducers:{
        storeRestaurant(state,action){
            state.allRestaurants= action.payload;
        }
    }
});

export const  {storeRestaurant} = restaurantSlice.actions;

export default restaurantSlice.reducer;;