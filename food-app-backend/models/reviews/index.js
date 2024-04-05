import mongoose from "mongoose";


const ReviewSchema = new mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref:"Users",
        required:true
    },
    restaurant: {
        type: mongoose.Types.ObjectId,
        ref: "Restaurants",
        // required:true
    },
    kitchen: {
        type: mongoose.Types.ObjectId,
        ref: "Kitchens",
        // required:true
    },
    rating: {
        type :Number,
        required:true
    },
    comment:{
        type: String,
    },
},{
    timestamps:true,
});

export const ReviewModal = mongoose.model("Reviews",ReviewSchema);