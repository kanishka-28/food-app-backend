import { RestaurantModel } from "../../database/allModels";
import {UserModel} from "../../database/allModels";
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



Router.get('/',async (req, res) => {
   try {
      const {latitude, longitude,email}= req.query;
      // if (req.user.status !== "user"){
      //    res.status(401).json({error:"Not Authorized"});
      // }
      let user;
      if(email!==undefined){
         user = await UserModel.findOne({email});
      }
      
      if(user?.city){
         await ValidateRestaurantCity(req.user.address.city);
         const  city  = user.city;
         
         const restaurants = await RestaurantModel.find({ city });
         if (restaurants.length===0){
            res.status(404).json({message: "No restaurants found near you",success:false})
         }
         return res.status(200).json({restaurants,success: true});
      }
      else{
         const restaurants = await RestaurantModel.find();
        
         const newrestaurants=restaurants.filter(restaurant=>(
               getDistanceFromLatLonInKm(restaurant.mapLocation.latitude,restaurant.mapLocation.longitude,latitude,longitude)<500// radius of 3 km is too low
            ));
            if (newrestaurants.length===0){
               res.status(404).json({message: "No restaurants found near you",success:false})
            }
            return res.json({restaurants: newrestaurants,success: true});
      }

     


   }
   catch (error) {
      return res.status(500).json({ message: error.message, success:false });
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
//login as restaurant
Router.post("/login", async (req, res) => {
   try {
      const {name, city} = req.body.credentials
      const result = await RestaurantModel.findOne({
         name: name, 
         city: city
      }) 
      console.log(name, city);
      if(!result) {
         return res.status(400).json({error: `restaurant does not exist`, name: `${name}`})
      }
      return res.json({result})
   }
   catch(error){ 
      return res.status(500).json({error: error.message});
 }})


   /* 
   Route    /search
   Des      add Restaurant 
   Params    none
   body      searchString
   Access    Public
   Method   Get
   */
  // ye bunny ka kaam
  //middle-ware will give req.user
  Router.post("/addrest",async(req,res)=>{
     try{
        const data =req.body;
        console.log(req.body);
        const check= await RestaurantModel.find({name:data.name});
        console.log(check);
        if(check.length>0){
           check.map(rest =>{
              if(rest.city===data.city){
                  return res.status(400).json({error:"restaurant already exists"});
              }
           })
        }
        const restaurant= await RestaurantModel.create(data);        
        return res.json({restaurant});
      }   
   catch (error) {
      return res.status(500).json({ error: error.message });
   }

})


//here _id is id of restaurant
Router.put("/updaterestaurant/:_id",getUserStatus, async (req,res)=>{
   try {
      if (req.user.status!=="restaurant"){
         return res.status(401).send({error:"Not Authorized"});
      }
      const updatedRestaurant= await RestaurantModel.findByIdAndUpdate(req.params._id,{
         $set: req.body},
         {new:true}
      );
      res.json({updatedRestaurant});
   } catch (error) {
      return res.status(500).json({ error: error.message }); 
   }
});

export default Router;