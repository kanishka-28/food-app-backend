//Libraries

import express from 'express';
import { RestaurantModel } from '../../database/restaurant';
import getUserStatus from '../../middlewares/getUserStatus';

//databse model
import { ValidateRestaurantId } from "../../validation/restaurant";
const Router = express.Router();

/* 
    Route    /list
    Des      Get the list of menu of a particular restaurant     Params    _id
    Access    Public
    Method   Get
 */

 Router.get("/:_id",async (req,res)=>{
     try{
        await ValidateRestaurantId(req.params);
        const {_id}=req.params;
        const menu=await RestaurantModel.findById(_id).select("menuImage"); 
        return res.json({menu, success:true});
    }
    catch(error){
        return res.status(500).json({message: error.message,sucess: false});
    }
});
Router.put("/:_id",getUserStatus,async (req,res)=>{
    try{
       await ValidateRestaurantId(req.params);
       const {_id}=req.params;
       const {menuImage} = req.body;
       const menu=await RestaurantModel.findByIdAndUpdate(_id,{
        $push: {menuImage},
        },
        {
            new: true
        }).select("menuImage");
       return res.status(200).json({menu, success: true});
   }
   catch(error){
       return res.status(500).json({message: error.message, success: false});
   }
});

Router.put("/delete/:_id",getUserStatus,async (req,res)=>{
    try{
       await ValidateRestaurantId(req.params);
       const {_id}=req.params;
       const {menuImageId} = req.body;
       const menu=await RestaurantModel.findByIdAndUpdate(_id,{
        $pull: {menuImage:{_id:menuImageId}},
        },
        {
            new: true
        }).select("menuImage");
       return res.status(200).json({menu, success: true});
   }
   catch(error){
       return res.status(500).json({message: error.message, success: false});
   }
});







 export default Router;