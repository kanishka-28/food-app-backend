import express from 'express'

import { UserModel } from "../../database/allModels";
import getUserStatus from '../../middlewares/getUserStatus';
import { ValidateUserId, ValidateUser } from "../../validation/user";
const Router = express.Router();

/* 
Route     /
descrip   Get an user data
params    :_id
access    PUBLIC
method    GET
*/

Router.get("/:_id", async (req, res) => {
    try {
        await ValidateUserId(req.params);
        const { _id } = req.params;
        const getUser = await UserModel.findById(_id);
        return res.json({ user: getUser });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


/* 
Route     /update
descrip   Update an user data
params    :_userId
Body      user data
access    PUBLIC
method    PUT

*/

Router.put("/update", getUserStatus, async (req, res) => {
    try {
        await ValidateUserId({_id : req.body._userId});
        // await ValidateUser(req.body.userData);
        let { userData, _userId } = req.body;
       if(userData.city){
           userData.city = userData?.city?.toLowerCase();
       }
    //    console.log(req.body);
        if (_userId === req.user._id.toString()) {
            const updateUserData = await UserModel.findByIdAndUpdate(_userId, {
                $set: userData,
                upsert: true
            },
                {
                    new: true
                }
            );
            return res.json({ user: updateUserData, success: true });
        }
        else{
            throw new Error("Not Authorized");
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});


export default Router;



