import { string } from 'joi';
import mongoose from 'mongoose'

const FoodSchema = new mongoose.Schema({
    name:{type:String,required:true},
    descript:{type:String,required:true},
    isVeg: {type: Boolean,required:true},
    isContainEgg:  {type: Boolean,required:true},
    category: { type:String, required:true },
    photo:{
        type: String
    },
    price:{type:Number, default: 150, required:true},
    restaurant:{
        type:mongoose.Types.ObjectId,
        ref:"Restaurants",
        // required:true,
    },
    kitchen:{
        type:mongoose.Types.ObjectId,
        ref:"Kitchens",
        // required:true,
    },

},{
    timestamps:true
});

export const FoodModel= mongoose.model("Foods",FoodSchema);