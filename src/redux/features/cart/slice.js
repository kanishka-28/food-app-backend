import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    first: true,
    user: '',
    restaurant: '',
    orderDetails: [
        {
            food: '',
            quantity: 1,
            price: 0,
        }
    ],
    itemTotal: 0,
    status: 'pending',
}

const cartSlice = createSlice({
    name: 'Cart',
    initialState,
    reducers: {
        addToCart(state,action){
            if(state.first){
                state.user = action.payload.user
                state.restaurant = action.payload.restaurant
                state.orderDetails = [action.payload.orderDetails]
                state.first = false;
            }
            else if(state.restaurant!==action.payload.restaurant){
                toast.error("Can't add items from different restaurants");
                return;
            }
            else{
                state.orderDetails = [...state.orderDetails, action.payload.orderDetails]
            }
            state.itemTotal = state.itemTotal + action.payload.itemTotal
            toast.success('Added to cart');
        }
    }
})

export const {addToCart}  = cartSlice.actions;

export default cartSlice.reducer;