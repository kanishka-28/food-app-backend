import express from "express";
import cors from "cors";
import helmet from 'helmet';
import passport from 'passport'
import serverless from 'serverless-http'

//config 
import googleAuthConfig from "./config/google.config";

//API
import Auth from "./API/Auth";
import User from "./API/User";
import Restaurant from './API/Restaurant';
import Food from "./API/Food";
import Menu from "./API/Menu";  
import Order from "./API/orders";
import Images from "./API/RestaurantPhotos";
import Reviews from "./API/Review";
import Kitchens from "./API/Kitchen";

//env variable
require("dotenv").config();
//database connection
import ConnectDB from "./database/connection";
import routeConfig from "./config/route.config";

const Router = express.Router();

const foodie = express();
foodie.use(express.json({ limit: '50mb' }));
foodie.use(express.urlencoded({ extended: true, limit: '10mb' }));
// foodie.use(cors());
foodie.use(helmet());
foodie.use(passport.initialize());
foodie.use(passport.session());

// const cors = require('cors');
const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    optionsSuccessStatus: 200,
    credentials: true
  };
  
//   app.use(cors(corsOptions));
foodie.use(cors(corsOptions));

//passport configuration

googleAuthConfig(passport);

routeConfig(passport);


//for application routes
//localhost:4000/auth/signup 

foodie.use("/auth", Auth);
foodie.use('/user', User);
foodie.use("/restaurant", Restaurant);
foodie.use("/food", Food);
foodie.use("/menu", Menu);
foodie.use("/image", Images);
foodie.use("/review", Reviews);
foodie.use('/order', Order);
foodie.use('/kitchen', Kitchens);


foodie.get("/", (req, res) => {
    res.json({ message: "setup success !!" })
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
});

const PORT = process.env.PORT || 4000
foodie.listen(PORT, () =>
    ConnectDB().then(() =>
        console.log("Server is up and running"))
        .catch(() => console.log("DB connection failed"))
);

foodie.use('/.netlify/functions/api', Router);
module.exports.handler = serverless(foodie);