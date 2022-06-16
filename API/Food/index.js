//libraries

import express from "express";


//Database Model
import { FoodModel } from "../../database/allModels";
import getUserStatus from "../../middlewares/getUserStatus";


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

Router.get("/:id", async (req, res) => {
   try {

      await ValidateRestaurantId(req.params);
      const { id } = req.params;
      const foods = await FoodModel.find({ restaurant: id });
      return res.json({ foods, success: true });
   }
   catch (error) {
      return res.status(500).json({ message: error.message, success: false });
   }

});

/* 
   Route    /r
   Des      Get all foods based on particular category
   Params    category
   Access    Public
   Method   Get
*/


Router.get("/r/:category", async (req, res) => {
   try {
      await ValidateCategory(req.params);

      const { category } = req.params;
      const foods = await FoodModel.find({
         category: { $regex: category, $options: "i" }
      })
      return res.json({ foods });
   }
   catch (error) {
      return res.status(500).json({ error: error.message });
   }
})

/* 
   Route    /food/
   Des      post food from a particular restaurant
   Params   category
   Access   Public
   Method   post
*/

Router.post("/add/:id", getUserStatus, async (req, res) => {
   try {
      // console.log();
      if (req.user._id.toString() === req.body.user) {
         const { id } = req.params;
         await ValidateRestaurantId({ id });
         const check = await FoodModel.find({ restaurant: id, name: req.body.name });
         if (check.length !== 0) {
            return res.status(409).json({ message: "food item already exists" });
         }
         const food = await FoodModel.create({ ...req.body, restaurant: id });
         return res.json({ food, success: true });
      }
      else {
         return res.status(401).json({ message: "Not Authorized" });
      }
   }
   catch (error) {
      return res.status(500).json({ message: error.message, success: true });
   }
})

/* 
   Route    /edit
   Des      edit food from a particular restaurant
   Params    category
   Access    Public
   Method   put
*/

Router.put("/edit/:id", getUserStatus, async (req, res) => {
   try {
      await ValidateRestaurantId(req.params.id);
      food = await FoodModel.findByIdAndUpdate(req.params.id, {
         $set: req.body,
         upsert: true
      }, { new: true })
      return res.json({ food, success: true });
   }
   catch (error) {
      return res.status(500).json({ message: error.message, success: false });
   }
})

/* 
   Route    /delete/:id
   Des      delete food item with id as id
   Params    category
   Access    Public
   Method   Get
*/

Router.post("/delete/:id", getUserStatus, async (req, res) => {
   try {
      await ValidateRestaurantId(req.params.id);
      const food = await FoodModel.findByIdAndDelete(req.params.id)
      return res.json({ food, success: true });
   }
   catch (error) {
      return res.status(500).json({ message: error.message, success: false });
   }
})


export default Router;


// ab sirf validation hoga bhidhu