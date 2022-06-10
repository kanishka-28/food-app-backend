import express from 'express';
import passport from 'passport';

const Router=express.Router();

//models
import {UserModel} from "../../database/user/index";
import getUserStatus from '../../middlewares/getUserStatus';

//validation

import { ValidateSignup,ValidateSignin } from "../../validation/auth";


/* 
Route     /loaduser
descrip   load user using token
params    none
access    public
method    post

*/

Router.get("/loaduser",getUserStatus,async(req,res)=>{
    try{
      if(req.user){
        return res.status(200).json({success:true, user: req.user});
      }
      else{
        throw new Error("Something's Wrong, Try Signing in again");
      }

    } catch(error){
        return res.status(500).json({message: error.message, success : false});
    }
})
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
      const { email} = req.body.credentials
      
      const user = await UserModel.findOne({email})
      if(!user){
        //DB
        const newUser=await UserModel.create(req.body.credentials)

        //JWT AUth Token
        const token = newUser.generateJwtToken();

        return res.status(200).json({token, status: newUser.status, user: newUser, success:true});
      }
      throw new Error('User Already Exists');

    } catch(error){
        return res.status(500).json({message: error.message, success : false});
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
      const {userName, password , email} = req.body.credentials
        await ValidateSignin(req.body.credentials);
      
        let user = await UserModel.findByEmailAndPassword({email, password});
        user.password = null;
        //JWT AUth Token
        const token = user.generateJwtToken();
        console.log(user);
        return res.status(200).json({token,success : true , user: user, status: user.status});

    } catch(error){
        return res.status(500).json({message: error.message , success: false});
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
  try {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');  
    const token = req.session.passport.user.token;
    res.redirect(`http://localhost:3000/auth/google/${token}`);
  //  res.json({token: req.session.passport.user.token, success:true, user: req.session.passport.user.user});
  } catch (error) {
    return res.status(500).json({message: error.message , success: false});
  }
  
});

export default Router;
//google signup is not there 