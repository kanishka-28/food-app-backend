import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "Users"
    },
    
    orderDetails: [
        {
            restaurant:{type:mongoose.Types.ObjectId,ref:"Restaurants"},
            food: { type: mongoose.Types.ObjectId, ref: "Foods" },
            quantity: { type: Number, required: true },
            itemTotal: { type: Number, required: true },
        }
    ],
},
    {
        timestamps: true
    });


export const OrderModel = mongoose.model("Orders", OrderSchema);