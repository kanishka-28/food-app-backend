import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "Users"
    },
    restaurant: { 
        type: mongoose.Types.ObjectId, 
        ref: "Restaurants" 
    },
    kitchen: { 
        type: mongoose.Types.ObjectId, 
        ref: "Kitchens" 
    },
    orderDetails: [
        {
            food: { type: mongoose.Types.ObjectId, ref: "Foods" },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    itemTotal: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'cancelled', 'rejected', 'accepted'],
        default: 'pending',
        required: true
    }
},
    {
        timestamps: true
    });


export const OrderModel = mongoose.model("Orders", OrderSchema);