import express from "express";
import cors from "cors";
import helmet from 'helmet';
import passport from 'passport'

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
//env variable
require("dotenv").config();

//database connection
import ConnectDB from "./database/connection";
import routeConfig from "./config/route.config";


const zomato = express();
zomato.use(express.json({ limit: '50mb' }));
zomato.use(express.urlencoded({ extended: true, limit: '10mb' }));
// zomato.use(cors());
zomato.use(helmet());
zomato.use(passport.initialize());
zomato.use(passport.session());

// const cors = require('cors');
const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    optionsSuccessStatus: 200,
    credentials: true
  };
  
//   app.use(cors(corsOptions));
zomato.use(cors(corsOptions));

//passport configuration

googleAuthConfig(passport);

routeConfig(passport);


//for application routes
//localhost:4000/auth/signup

zomato.use("/auth", Auth);
zomato.use('/user', User);
zomato.use("/restaurant", Restaurant);
zomato.use("/food", Food);
zomato.use("/menu", Menu);
zomato.use("/image", Images);
zomato.use("/review", Reviews);
zomato.use('/order', Order);


zomato.get("/", (req, res) => {
    res.json({ message: "setup success !!" })
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
});

const PORT = process.env.PORT || 4000
zomato.listen(PORT, () =>
    ConnectDB().then(() =>
        console.log("Server is up and running"))
        .catch(() => console.log("DB connection failed"))
);