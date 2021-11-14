import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    mapLocation: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    },
    restauarntTimings: { type: String },
    contactNumber: { type: Number },
    website: { type: String },
    limit:{type:Number},
    amenities: [{ type: String }],
    menuImages: { type: String, },
    menu: {
        type: mongoose.Types.ObjectId,
        ref: "Menus"
    },
    photos: [{ type: String }]
}, {
    timestamps: true
});

export const RestaurantModel = mongoose.model("Restaurants", RestaurantSchema);