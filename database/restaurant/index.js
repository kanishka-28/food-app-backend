import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    mapLocation: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    },
    timing: { type: String },
    contactNumber: { type: Number },
    brand : {type: String},
    website: { type: String },
    limit:{type:Number},
    amenities: [{ type: String }],
    menuImage: { type: String, },
    user:{
        type: mongoose.Types.ObjectId,
        ref: "Users",
        required: true
    },
    photos: [{ type: String }],
    coverImage: {type: String}
}, {
    timestamps: true
});

export const RestaurantModel = mongoose.model("Restaurants", RestaurantSchema);