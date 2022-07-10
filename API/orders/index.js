import express from 'express'


import { OrderModel } from "../../database/allModels";
import { ValidateUserId } from "../../validation/user";
import { ValidateOrder, ValidateOrderId } from "../../validation/order";
import { ValidateRestaurantId } from "../../validation/restaurant";
import getUserStatus from "../../middlewares/getUserStatus"
import { getOrderDetails } from './helperFunctions';

const Router = express.Router();

/* 
Route     /:_id
descrip   get all orders based on _id of user
params    _id
access    public
method    GET
*/

Router.get("/user/:_id", getUserStatus, async (req, res) => {
    await ValidateUserId(req.params);
    const { _id } = req.params;
    try {
        if (req.user._id.toString() === _id) {
            // const orders = await OrderModel.find({ user: _id }).populate('orderDetails.food');
            const orders = await getOrderDetails(_id);
            console.log(orders);
            if (!orders) {
                return res.status(404).json({ message: "Orders not found", success: false });
            }
            return res.status(200).json({ orders, success: true });
        } else {
            return res.status(401).send("unauthorized")
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message, success: false });
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
        await ValidateRestaurantId(req.params);
        const { _id } = req.params;
        const orders = await OrderModel.find({
            restaurant: _id
        }).populate('orderDetails.food');
        if (!orders) {
            return res.status(404).json({ error: "Orders not found" });
        }
        return res.status(200).json({ orders, success:true });
    }
    catch (error) {
        return res.status(500).json({ message: error.message, success: false });
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
        await ValidateOrder(req.body);
        const { _id } = req.params;
        if (req.user._id.toString() !== _id) {
            return res.status(401).send("Not Authorized")
        }
        const addNewOrder = await OrderModel.create(req.body);
        return res.status(200).json({ order: addNewOrder, success:true });
    }
    catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});

/* 
Route     /update
descrip   update order status
params    _id
access    public
method    POST
*/
Router.put("/update/:_id", getUserStatus, async (req, res) => {
    try {
        await ValidateOrderId(req.params);
        const { _id } = req.params;
        const {status} = req.body;
        if (status!=='accepted' || status!=='rejected' || status!=="cancelled") {
            return res.status(400).send("Invalid Status")
        }
        const updatedOrder = await OrderModel.findByIdAndUpdate(_id,{
            $set:{
                status
            }
        },{
            new:true
        })

        return res.status(200).json({ order: updatedOrder, success:true });


    }
    catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});

// agr reastaurant h delete api bnaadena bunny bnana
//_id is order id
//insert middleware here
Router.delete("/delete/:_id/:orderId", getUserStatus, async (req, res) => {
    //user fetched from middleware req.user with id of user
    try {
        const { _id, orderId } = req.params
        // if (req.user.status === "user" && req.user._id.toString() === req.params._id) {
        //     const result = await OrderModel.findOneAndUpdate({
        //         user: _id
        //     }, {
        //         $pull: { orderDetails: { _id : orderId } } 
        //     }, {
        //         new: true
        //     });
        //     res.json({ message: "deleted successfuly", result });
        // }
        // else if (req.user.status === "restaurant" && req.user._id.toString() === req.params._id) {

        //     const result = await OrderModel.findOneAndUpdate({
        //         "orderDetails.restaurant": _id
        //     }, {
        //         $pull: { orderDetails: { _id : orderId } }
        //     }, {
        //         new: true
        //     });
        //     res.json({ message: "deleted successfuly", result });
        // }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

export default Router;