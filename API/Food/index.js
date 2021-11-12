//libraries

import express from "express";


//Database Model
import {FoodModel} from "../../database/allModels";


//validation
import { ValidateRestaurantId, ValidateCategory } from "../../validation/food";

const Router = express.Router();

/* 
    Route    /
    Des      Get all foods based on particular restaurant 
    Params    _id
    Access    Public
    Method   Get
 */

 Router.get("/:id",async(req,res)=>{
     try{

      await ValidateRestaurantId(req.params);

        const{_id}=req.params;
        const foods = await FoodModel.find({ restaurant: _id});
        return res.json({foods});
     }
     catch(error){
        return res.status(500).json({error: error.message});
     }

 });

 /* 
    Route    /r
    Des      Get all foods based on particular category
    Params    category
    Access    Public
    Method   Get
 */


 Router.get("/r/:category",async(req,res)=>{
     try{
      await ValidateCategory(req.params);

        const {category}= req.params;
        const foods = await FoodModel.find({
            category: {$regex: category,$options:"i"}
        })
        return res.json({foods});
     }
     catch(error){
        return res.status(500).json({error: error.message});
     }
 })


export default Router;


//middle ware
//token user 
// specific user ki status kya h 
// jo status h usko return krna h 
// status aur id ko return krna h header mai daalkr
// api call if 

//api bnengi 3 
// ek post kregi food
// ek delete kregi
// ek update bhi
