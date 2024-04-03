import { number } from "joi";
import mongoose from "mongoose";

const KitchenSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true, lowercase:true },
    address: { type: String, required: true },
    // mapLocation: {
    //     latitude: { type: Number, required: true },
    //     longitude: { type: Number, required: true }
    // },
    timing: { type: String },
    contactNumber: { type: Number },
    // brand: { type: String },
    website: { type: String },
    limit: { type: Number },
    // amenities: [{ type: String }],
    reviews: [{ type: String }],
    menuImage: [{
        url: { type: String, }
    }],
    user: {
        type: mongoose.Types.ObjectId,
        ref: "Users",
        required: true
    },
    // photos: [{
    //     url: { type: String }
    // }],
    // coverImage: { type: String }
}, {
    timestamps: true
});

export const KitchenModel = mongoose.model("Kitchens", KitchenSchema);