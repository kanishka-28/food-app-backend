import { RestaurantModel } from "../../database/allModels";
import { UserModel } from "../../database/allModels";
import express from 'express'


//validation
import { ValidateRestaurantCity, ValidateRestaurantId, ValidateRestaurantSearchString } from "../../validation/restaurant";
import getUserStatus from "../../middlewares/getUserStatus";
import { getDistanceFromLatLonInKm } from "./helperFunction";

const Router = express.Router();

/* 
    Route    /
    Des      Get all restaurants details
    Params    None
    Access    Public
    Method   Get
 */



Router.get('/', async (req, res) => {
   try {
      const { latitude, longitude, email } = req.query;
      let user;
      if (email !== undefined) {
         user = await UserModel.findOne({ email });
      }
      if (user?.city) {
         await ValidateRestaurantCity({ city: user?.city });
         const city = user?.city.toLowerCase();
         const restaurants = await RestaurantModel.find({ city }).sort({ updatedAt: -1 });
         if (restaurants.length === 0) {
            res.status(404).json({ message: "No restaurants found near you", success: false })
         }
         return res.status(200).json({ restaurants, success: true });
      }
      else {
         const restaurants = await RestaurantModel.find().sort({ updatedAt: -1 });

         const newrestaurants = restaurants.filter(restaurant => (
            getDistanceFromLatLonInKm(restaurant.mapLocation.latitude, restaurant.mapLocation.longitude, latitude, longitude) < 500// radius of 3 km is too low
         ));
         if (newrestaurants.length === 0) {
            res.status(404).json({ message: "No restaurants found near you", success: false })
         }
         return res.json({ restaurants: newrestaurants, success: true });
      }
   }
   catch (error) {
      return res.status(500).json({ message: error.message, success: false });
   }
})
/* 
    Route    restaurants/user/
    Des      Get all restaurants details of an user
    Params    none
    Access    Public
    Method   Get
 */

Router.get('/user', getUserStatus, async (req, res) => {
   try {
      const restaurants = await RestaurantModel.find({ user: req.user._id }).sort({ updatedAt: -1 })
      // console.log(restaurants);
      return res.status(200).json({ restaurants, success: true });
   }
   catch (error) {
      return res.status(500).json({ message: error.message, success: false });
   }
})
/* 
    Route    /:id
    Des      Get particular Restaurant details on id
    Params    id
    Access    Public
    Method   Get
 */

Router.get('/:_id', async (req, res) => {
   try {
      //could have been fetched from food too
      await ValidateRestaurantId(req.params);
      const { _id } = req.params;
      const restaurant = await RestaurantModel.findOne({ _id });
      if (!restaurant) {
         return res.status(404).json({ error: "Restaurant not found" });
      }
      return res.json({ restaurant });
   }
   catch (error) {
      return res.status(500).json({ error: error.message });
   }
});


/* 
Route    /search
Des      Get Restaurant details on search
Params    none
body      searchString
Access    Public
Method   Get
*/


Router.get("/search", async (req, res) => {
   try {
      await ValidateRestaurantSearchString(req.params);
      const { searchString } = req.body;
      const restaurants = await RestaurantModel.find({
         name: { $regex: searchString, $options: "i" },
      });
      return res.json({ restaurants });
   }
   catch (error) {
      return res.status(500).json({ error: error.message });
   }

})



/* 
Route    /addrest
Des      add Restaurant 
Params    none
body      searchString
Access    Public
Method   Get
*/
// ye bunny ka kaam
//middle-ware will give req.user
Router.post("/addrest", getUserStatus, async (req, res) => {
   try {
      let data = req.body;
      data.city = data.city.toLowerCase();
      if (data.user == req.user._id.toString()) {
         const check = await RestaurantModel.find({ user: req.user._id, name: req.body.name, city: req.body.city });

         if (check.length !== 0) {
            return res.status(409).json({ message: "restaurant already exists", success: false })
         }
         const restaurant = await RestaurantModel.create(data);
         return res.status(200).json({ restaurant, success: true });
      }
      else {
         throw new Error("Not authorized");
      }

   }
   catch (error) {
      return res.status(500).json({ message: error.message, success: false });
   }

})

//here _id is id of restaurant
Router.put("/update/:_id", getUserStatus, async (req, res) => {
   try {
      const { _id } = req.params;
      let check = RestaurantModel.findOne({ _id, user: req.user._id });
      if (!check) {
         res.status(401).json({ message: "Not Authorized" });
      }
      const updatedRestaurant = await RestaurantModel.findByIdAndUpdate(_id, {
         $set: req.body,
         upsert: true
      },
         { new: true }
      );
      res.status(200).json({ updatedRestaurant, success: true });
   } catch (error) {
      return res.status(500).json({ message: error.message, success: false });
   }
});


//delete restaurant



export default Router;