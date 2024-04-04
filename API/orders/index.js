import express from 'express'


import { OrderModel, RestaurantModel, UserModel } from "../../database/allModels";
import { ValidateUserId } from "../../validation/user";
import { ValidateOrder, ValidateOrderId } from "../../validation/order";
import { ValidateRestaurantId } from "../../validation/restaurant";
import getUserStatus from "../../middlewares/getUserStatus"
import { getOrderDetailsRestaurant, getOrderDetailsUser } from './helperFunctions';
import { sendMail } from '../../controllers/emailSender';
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
            const orders = await getOrderDetailsUser(_id);
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
        // const orders = await OrderModel.find({
        //     restaurant: _id
        // }).populate('orderDetails.food');
        const orders = await getOrderDetailsRestaurant(_id);
        if (!orders) {
            return res.status(404).json({ error: "Orders not found" });
        }
        return res.status(200).json({ orders, success: true });
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

        const { _id } = req.params;
        if (req.user._id.toString() !== _id) {
            return res.status(401).send("Not Authorized")
        }
        const addNewOrder = await OrderModel.create(req.body);
        const restaurant = await RestaurantModel.findById(req.body.restaurant);
        const { email } = await UserModel.findById(restaurant.user);
        await sendMail(email, 'Incoming order for you!!', `<h4>A new Order has arrived at your Restaurant, ${restaurant.name}:</h4><a href="https://restaurant-app-azure.vercel.app/restaurant/orders/${req.body.restaurant}">Manage it here</a>`)
        return res.status(200).json({ order: addNewOrder, success: true });
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
        const { status } = req.body;
        if (status !== 'accepted' && status !== 'rejected' && status !== "cancelled") {
            return res.status(400).json({ message: "Invalid Status" })
        }

        const updatedOrder = await OrderModel.findByIdAndUpdate(_id, {
            $set: {
                status
            }
        }, {
            new: true
        })

        const user = await UserModel.findById(updatedOrder.user);
        const restaurant = await RestaurantModel.findById(updatedOrder.restaurant);
        const { email } = await UserModel.findById(restaurant.user);
        if (status == "cancelled") {
            await sendMail(email, 'Order Cancelled!!', `<h4>One of your  Orders has been cancelled by the user, ${user.userName}:</h4><a href="https://restaurant-app-azure.vercel.app/restaurant/orders/${updatedOrder.restaurant}">Check here</a>`)

        }
        else if(status=="accepted" || status=="rejected"){
            await sendMail(user.email, `Order ${status}!!`, `<h4>Your Order has been ${status} by the the Restaurant, ${restaurant.name}:</h4><a href="https://our-foodapp.vercel.app/me/orders">Check here</a>`)
        }
        return res.status(200).json({ message: "Order updated", success: true });


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