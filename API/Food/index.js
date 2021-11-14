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
      return res.json({ foods });
   }
   catch (error) {
      return res.status(500).json({ error: error.message + "hnji hm h"});
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

Router.post("/addfood/:id", getUserStatus, async (req, res) => {
   try {
     
      // await ValidateRestaurantId(id);

     
      if (req.user.status === "restaurant" ) {

         const restaurant = req.params.id
         const {name, descript, isVeg, isContainEgg, category, price} = req.body
         const food = await FoodModel.create({
            name: name,
            descript: descript,
            isVeg: isVeg,
            isContainEgg: isContainEgg,
            category: category,
            price: price,
            restaurant : restaurant
         })
         
         return res.json({ food });
      }
      else {
         return res.status(401).send("user cant add restaurant food")
      }

   }
   catch (error) {
      return res.status(500).json({ error: error.message + ' 500' });
   }
})

/* 
   Route    /r
   Des      Get all foods based on particular category
   Params    category
   Access    Public
   Method   put
*/

Router.put("/editfood/:id", getUserStatus, async (req, res) => {
   try {
      await ValidateRestaurantId(req.params.id);
      if (req.user.status === "restaurant" && req.user.id===req.params.id){
         const restaurant = req.params.id
         const {name, descript, isContainEgg, category, photos, price} = req.body
         const newFood = {}
         if (name) { newFood.name = name };
         if (descript) { newFood.descript = descript };
         if (isContainEgg) { newFood.isContainEgg = isContainEgg };
         if (category) { newFood.category = category };
         if (photos) { newFood.photos = photos };
         if (price) { newFood.price = price };
         
         food = await FoodModel.findByIdAndUpdate(req.params.id, {
            $set: newFood
         }, {new: true})
         return res.json({ food });
      }
      else {
         return res.status(401).send("user cant add restaurant food")
      }
      
   }
   catch (error) {
      return res.status(500).json({ error: error.message });
   }
})

/* 
   Route    /r
   Des      Get all foods based on particular category
   Params    category
   Access    Public
   Method   Get
*/

Router.post("/deletefood/:id", getUserStatus, async (req, res) => {
   try {
      await ValidateRestaurantId(req.params.id);
      if (req.user.status === "restaurant" && req.user.id===req.params.id) {
         
         const food = await FoodModel.findByIdAndDelete(req.params.id)

         return res.json({ food });
      }
      else {
         return res.status(401).send("user cant add restaurant food")
      }

   }
   catch (error) {
      return res.status(500).json({ error: error.message });
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