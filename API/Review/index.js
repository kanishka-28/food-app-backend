import express from "express";
import { ReviewModal } from "../../database/reviews";
import { ValidateRestaurantId } from "../../validation/restaurant";
import { ValidateUserId } from "../../validation/user";
import getUserStatus from "../../middlewares/getUserStatus";
const Router = express.Router();


Router.get('/rest/:restaurant', async (req, res) => {
    try {
        const { restaurant } = req.params;
        await ValidateRestaurantId({ _id: restaurant });
        const reviews = await ReviewModal.find({ restaurant }).populate("user").sort({ updatedAt: -1 });
        res.status(200).json({ reviews, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
})
Router.get('/user/:user', async (req, res) => {
    try {
        const { user } = req.params;
        await ValidateUserId({ _id: user });
        const reviews = await ReviewModal.find({ user }).populate("restaurant").sort({ updatedAt: -1 });
        res.status(200).json({ reviews, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
})
Router.post('/add', getUserStatus, async (req, res) => {
    try {
        const { user } = req.body;
        if (req.user._id.toString() === user) {
            await ValidateUserId({ _id: user });
            const review = await ReviewModal.create(req.body);
            return res.status(200).json({ review, success: true });
        }
        return res.status(401).json({ message: "Not Authorized", success: false });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
})
Router.delete('/delete/:id', getUserStatus, async (req, res) => {
    try {
        const {id} = req.params;
        const review = await ReviewModal.findByIdAndDelete(id);
        res.status(200).json({ review, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
})

export default Router;
