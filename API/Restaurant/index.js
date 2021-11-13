import { RestaurantModel } from "../../database/allModels";
import express from 'express'


//validation
import { ValidateRestaurantCity, ValidateRestaurantId, ValidateRestaurantSearchString } from "../../validation/restaurant";
import getUserStatus from "../../middlewares/getUserStatus";

const Router = express.Router();

/* 
    Route    /
    Des      Get all restaurants details
    Params    None
    Access    Public
    Method   Get
 */
//function for calculating distance in KM
function getDistanceFromLatLonInKm(lat1,lon1,lat2=0,lon2=0) {
   var R = 6371; // Radius of the earth in km
   var dLat = deg2rad(lat2-lat1);  // deg2rad below
   var dLon = deg2rad(lon2-lon1); 
   var a = 
     Math.sin(dLat/2) * Math.sin(dLat/2) +
     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
     Math.sin(dLon/2) * Math.sin(dLon/2)
     ; 
   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
   var d = R * c; // Distance in km
   console.log(d);
   return d;
 }
 
 function deg2rad(deg) {
   return deg * (Math.PI/180)
 }


Router.get('/', getUserStatus,async (req, res) => {
   try {
      const {latitude, longitude}= req.query;
      if (req.user.status !== "user"){
         res.status(401).json({error:"Not Authorized"});
      }
      
      // await ValidateRestaurantCity(req.user.address.city);
      const  city  = req.user.address.city;
      let restaurants = await RestaurantModel.find({ city });
      restaurants=restaurants.filter(restaurant=>(
         getDistanceFromLatLonInKm(restaurant.mapLocation.latitude,restaurant.mapLocation.longitude,latitude,longitude)<10// radius of 3 km is too low
      ));
      return res.json({ restaurants });
   }
   catch (error) {
      return res.status(500).json({ error: error.message });
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
Route    /search
Des      Get Restaurant details on search
Params    none
body      searchString
Access    Public
Method   post
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
Route    /search
Des      add Restaurant 
Params    none
body      searchString
Access    Public
Method   Get
*/

Router.post("/login", getUserStatus, async (req, res) => {
   try {

      const res = await RestaurantModel.findOne(req.body.name && req.body.city)
      if(res) {
         return res.status(400).json({error: `restaurant does not exist`, name: `${req.body.name}`})
      }
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
  Router.post("/addrest",getUserStatus,async(req,res)=>{
     try{
        const data =req.body;
        const user = req.user;
        if(user.status!=="restaurant"){
           res.status(401).json({error: "not authorized"})
        }
        const check= await RestaurantModel.find({name:data.name});
        if(check.length>0){
           
           if(check[0].city===data.city){
               return res.status(400).json({error:"restaurant already exists"});
           }
        }
        const restaurant= await RestaurantModel.create(data);
         
        
         return res.json({restaurant});
      }
      
   
   catch (error) {
      return res.status(500).json({ error: error.message });
   }

})

export default Router;