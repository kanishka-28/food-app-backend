import express from 'express'

import passport from 'passport'

import { OrderModel } from "../../database/allModels";
import { ValidateUserId } from "../../validation/user";
import { ValidateOrder } from "../../validation/order";
import { ValidateRestaurantId } from "../../validation/restaurant";
import getUserStatus from "../../middlewares/getUserStatus"

const Router = express.Router();

/* 
Route     /:_id
descrip   get all orders based on _id of user
params    _id
access    public
method    GET
*/

Router.get("/user/:_id", getUserStatus, async (req, res) => {
    try {
        if (req.user.status === "user") {
            await ValidateUserId(req.params);
            const { _id } = req.params;
            const getOrders = await OrderModel.findOne({ user: _id });
            if (!getOrders) {
                return res.status(404).json({ error: "User not found" });
            }
            return res.json({ getOrders });
        } else {
            return res.statusCode(401).send("unauthorized")
        }
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/* 
Route     /:_id
descrip   get all orders based on _id of restaurant
params    _id
access    public
method    GET
*/

Router.get("/res/:_id", getUserStatus, async (req, res) => {
    try {
        if (req.user.status === "restaurant") {
            await ValidateRestaurantId(req.params);
            const { _id } = req.params;
            console.log(_id, req.user._id);
            const getOrders = await OrderModel.findOne({
                "orderDetails.restaurant": _id
            });
            if (!getOrders) {
                return res.status(404).json({ error: "restaurant not found" });
            }
            return res.json({ getOrders });
        }
        else {
            return res.statusCode(401).send("unauthorized")
        }
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/* 
Route     /new
descrip   add new order
params    _id
access    public
method    POST
*/

Router.post("/new/:_id", getUserStatus, async (req, res) => {
    try {
        await ValidateUserId(req.params);
        // await ValidateOrder(req.body);
        const { _id } = req.params;
        const { orderDetails } = req.body;
        if(req.user._id.toString() !== _id){
            return res.status(401).send("user does not match")
        }
        if (req.user.status === "user") {
            const user = await OrderModel.findOne({ user: _id })
        
            if (!user) {
                const addNewOrder = await OrderModel.create({
                    user: _id,
                    orderDetails: orderDetails
                }
                );
                return res.json({ order: addNewOrder });
            }
            console.log(orderDetails);
            const addNewOrder = await OrderModel.findOneAndUpdate({
                user: _id
            }, {
                $push: { orderDetails: orderDetails }
            }, {
                new: true
            });
            return res.json({ order: addNewOrder });
        }
        else {
            return res.status(401).send("restaurants are not allowed to order food")
        }
    }
    catch (error) {
        return res.status(500).json({ error: error.message + " 500" });
    }
});

// agr reastaurant h delete api bnaadena bunny bnana
//_id is order id
//insert middleware here
Router.delete("/delete/:_id/:orderId", getUserStatus, async (req, res) => {
    //user fetched from middleware req.user with id of user
    try {
        const {_id, orderId} = req.params
        if (req.user.status === "user" && req.user._id.toString() === req.params._id) {
            const result = await OrderModel.findOneAndUpdate({
                user: _id
            }, {
                $pull: { orderDetails: { _id : orderId } } 
            }, {
                new: true
            });
            res.json({ message: "deleted successfuly", result });
        }
        else if (req.user.status === "restaurant" && req.user._id.toString() === req.params._id) {
            
            const result = await OrderModel.findOneAndUpdate({
                "orderDetails.restaurant": _id
            }, {
                $pull: { orderDetails: { _id : orderId } }
            }, {
                new: true
            });
            res.json({ message: "deleted successfuly", result });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

export default Router;