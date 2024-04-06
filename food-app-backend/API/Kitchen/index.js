import { UserModel } from "../../database/allModels";
import express from 'express'


//validation
import { ValidateRestaurantCity, ValidateRestaurantId, ValidateRestaurantSearchString } from "../../validation/restaurant";
import getUserStatus from "../../middlewares/getUserStatus";
import { KitchenModel } from "../../models/kitchen";

const Router = express.Router();

/* 
    Route    /
    Des      Get all kitchen details
    Params    None
    Access    Public
    Method   Get
 */

Router.get('/', async (req, res) => {
   try {
      const { email } = req.query;
      let user;
      if (email) {
         user = await UserModel.findOne({ email });
      }
      if (user?.city) {
         await ValidateRestaurantCity({ city: user.city });
         const city = user?.city.toLowerCase();
         const kitchens = await KitchenModel.find({ city: city });
         if (kitchens.length === 0) {
            return res.status(404).json({ message: "No kitchens found in your city", success: false })
         }
         return res.status(200).json({ kitchens, success: true });
      }
      else {
         const kitchens = await KitchenModel.find();
         if (kitchens.length === 0) {
            return res.status(404).json({ message: "No kitchens found", success: false })
         }
         return res.status(200).json({ kitchens: kitchens, success: true });
      }
   }
   catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: error.message, success: false });
   }
})

/* 
    Route    /user
    Des      Get all kitchens of an user
    Params    none
    Access    Public
    Method   Get
 */

Router.get('/user', getUserStatus, async (req, res) => {
   try {
      const kitchens = await KitchenModel.aggregate([
         {
            $match: {
               user: req.user._id
            },
         }
         , {
            $lookup: {
               from: "reviews",
               let: { kitchen: "$_id" },
               pipeline: [
                  {
                     $match: {
                        $expr: {
                           $eq: ['$kitchen', '$$kitchen']
                        }
                     }
                  },
                  {
                     $group: {
                        _id: "$kitchen",
                        avgRating: { $avg: "$rating" },
                        totalRatings: { $sum: 1 }
                     }
                  }

               ],
               as: 'reviews'
            }
         }
         , {
            $sort: {
               updatedAt: -1
            }
         }
      ])
      return res.status(200).json({ kitchens, success: true });
   }
   catch (error) {
      return res.status(500).json({ message: error.message, success: false });
   }
})
/* 
   Route    /:id
   Des      Get particular kitchen details on id
   Params   id
   Access   Public
   Method   Get
 */

Router.get('/:id', async (req, res) => {
   try {
      const { id } = req.params;
      await ValidateRestaurantId({ _id: id });
      const kitchen = await KitchenModel.findById(id);
      if (!kitchen) {
         return res.status(404).json({ error: "Kitchen not found" });
      }
      return res.json({ kitchen });
   }
   catch (error) {
      return res.status(500).json({ error: error.message });
   }
});


/* 
Route    /search
Des      Get kitchen details on search
Params    none
body      searchString
Access    Public
Method   Get
*/


Router.get("/search", async (req, res) => {
   try {
      await ValidateRestaurantSearchString(req.params);
      const { searchString } = req.body;
      const kitchens = await KitchenModel.find({
         name: { $regex: searchString, $options: "i" },
      });
      return res.json({ kitchens });
   }
   catch (error) {
      return res.status(500).json({ error: error.message });
   }

})


/* 
Route    /addkitchen
Des      add Kitchen 
Params    none
body      kitchen details
Access    Public
Method   Post
*/
Router.post("/addkitchen", getUserStatus, async (req, res) => {
   try {
      let data = req.body;
      data.city = data.city.toLowerCase();
      if (data.user == req.user._id.toString()) {
         const check = await KitchenModel.find({ user: req.user._id, name: req.body.name, city: req.body.city });
         if (check.length !== 0) {
            return res.status(409).json({ message: "Kitchen already exists", success: false })
         }
         const kitchen = await KitchenModel.create(data);
         return res.status(200).json({ kitchen, success: true });
      }
      else {
         throw new Error("Not authorized");
      }
   }
   catch (error) {
      return res.status(500).json({ message: error.message, success: false });
   }

})


/* 
Route    /update/:_id
Des      update kitchen 
Params    none
body      none
Access    Public
Method   put
*/
//here _id is id of kitchen
Router.put("/update/:_id", getUserStatus, async (req, res) => {
   try {
      const { _id } = req.params;
      ValidateRestaurantId({ _id });

      let check = KitchenModel.findOne({ _id, user: req.user._id });
      if (!check) {
         res.status(401).json({ message: "Not Authorized" });
      }
      const updatedKitchen = await KitchenModel.findByIdAndUpdate(_id, {
         $set: req.body,
         upsert: true
      },
         { new: true }
      ).select("-menuImage");
      res.status(200).json({ updatedKitchen, success: true });
   } catch (error) {
      return res.status(500).json({ message: error.message, success: false });
   }
});


/* 
Route    /delete/:id
Des      delete kitchen  
Params    none
body      none
Access    Public
Method   delete
*/
//delete kitchen
Router.delete('/delete/:_id', getUserStatus, async (req, res) => {
   try {
      const { _id } = req.params;
      ValidateRestaurantId({ _id });
      let check = KitchenModel.findOne({ _id, user: req.user._id });
      if (!check) {
         res.status(401).json({ message: "Not Authorized" });
      }
      const deletedKitchen = await KitchenModel.findByIdAndDelete(_id).select("-menuImage");
      res.status(200).json({ deletedKitchen, success: true });
   } catch (error) {
      return res.status(500).json({ message: error.message, success: false });
   }

})


export default Router;