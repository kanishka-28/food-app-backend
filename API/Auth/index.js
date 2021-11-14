import express from 'express';
import passport from 'passport';

const Router=express.Router();

//models
import {UserModel} from "../../database/user/index";


//validation

import { ValidateSignup,ValidateSignin } from "../../validation/auth";


/* 
Route     /signup
descrip   signup with email and password
params    none
access    public
method    post

*/

Router.post("/signup",async(req,res)=>{
    try{
      await ValidateSignup(req.body.credentials);
      console.log("signup");
      console.log(req.body);
        //check whether email or phone already exists
        await UserModel.findUserName(req.body.credentials);

        //DB
        const newUser=await UserModel.create(req.body.credentials)

        //JWT AUth Token
        const token = newUser.generateJwtToken();

        return res.status(200).json({token, status: newUser.status});

    } catch(error){
        return res.status(500).json({error: error.message});
    }
})

/* 
Route     /signin
descrip   signin with userName and password
params    none
access    public
method    post

*/

Router.post("/signin",async(req,res)=>{
    try{
        await ValidateSignin(req.body.credentials);
        
      const user = await UserModel.findByUserNameAndPassword(req.body.credentials);

      if(req.body.credentials.city){

      }

        //JWT AUth Token
        const token = user.generateJwtToken();

        return res.status(200).json({token, status:"Success", user: user.status});


    } catch(error){
        return res.status(500).json({error: error.message});
    }
})
/* 
Route     /google
descrip   Google signin/signup 
params    none
access    public
method    GET
*/

Router.get("/google",passport.authenticate("google",{
  scope:[
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
  ],
}));

/* 
Route     /google/callback
descrip   Google signin/signup callback
params    none
access    public
method    GET

*/

Router.get("/google/callback",passport.authenticate("google",{
  failureRedirect:"/"
} ),(req,res)=>{
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');  
   res.json({token: req.session.passport.user.token});
});

export default Router;
//google signup is not there 