import express from "express";
const Router = express.Router();


Router.get('/',async(req,res)=>{
    res.json({message:"success"});
})

export default Router;
