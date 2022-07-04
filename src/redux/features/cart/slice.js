import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    first: true,
    user: '',
    restaurant: '',
    orderDetails: [],
    itemTotal: 0,
    status: 'pending',
}

const cartSlice = createSlice({
    name: 'Cart',
    initialState,
    reducers: {
        addToCart(state,action){
            state.orderDetails.map((item)=>{
                if(item.food&&item.food==action.payload.food){
                    item.quantity = item.quantity + 1;
                    state.itemTotal = state.itemTotal + item.price;
                }
            })
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
        },
        incrementQuantity(state,action){
            state.orderDetails.map((item)=>{
                if(item.food&&item.food==action.payload.food._id){
                    item.quantity = item.quantity + 1;
                    state.itemTotal = state.itemTotal + item.price;
                }
            })
        },
        decrementQuantity(state,action){
            state.orderDetails.map((item)=>{
                if(item?.food&&item.food==action.payload.food._id){
                    if(item.quantity==1) return;
                    item.quantity = item.quantity - 1;
                    state.itemTotal = state.itemTotal - item.price;
                }
            })
        }
    }
})

export const {addToCart, incrementQuantity, decrementQuantity}  = cartSlice.actions;

export default cartSlice.reducer;