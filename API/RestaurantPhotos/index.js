//Libraries

import express from 'express';
import { RestaurantModel } from '../../database/restaurant';
import getUserStatus from '../../middlewares/getUserStatus';

//databse model
import { ValidateRestaurantId } from "../../validation/restaurant";
const Router = express.Router();

Router.get('/:_id',async(req,res)=>{
    try{
        await ValidateRestaurantId(req.params);
        const {_id}=req.params;
        const photos=await RestaurantModel.findById(_id).select("photos"); 
        return res.json({photos, success:true});
    }
    catch(error){
        return res.status(500).json({message: error.message,sucess: false});
    }
});

Router.put("/:_id",getUserStatus,async (req,res)=>{
    try{
       await ValidateRestaurantId(req.params);
       const {_id}=req.params;
       const {photos} = req.body;
       const newPhotos=await RestaurantModel.findByIdAndUpdate(_id,{
        $push: {photos},
        },
        {
            new: true
        }).select(photos);
       return res.status(200).json({newPhotos, success: true});
   }
   catch(error){
       return res.status(500).json({message: error.message, success: false});
   }
});


//yha pr ek pull ki bhi bna lete h 


export default Router;