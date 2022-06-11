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
//env variable
require("dotenv").config();


//database connection
import ConnectDB from "./database/connection";
import routeConfig from "./config/route.config";



const zomato = express();
zomato.use(express.json());
zomato.use(express.urlencoded({extended:false}));
zomato.use(cors());
zomato.use(helmet());
zomato.use(passport.initialize());
zomato.use(passport.session());

//passport configuration

googleAuthConfig(passport);

routeConfig(passport);


//for application routes
//localhost:4000/auth/signup

zomato.use("/auth", Auth);
zomato.use('/user',User);
zomato.use("/restaurant",Restaurant);
zomato.use("/food",Food);
zomato.use("/menu",Menu);
zomato.use('/order',Order);


zomato.get("/",(req,res)=> res.json({message: "setup success !!"}));
const PORT= process.env.PORT || 4000
zomato.listen(PORT,()=>
    ConnectDB().then(()=> 
 console.log("Server is up and running"))
 .catch(()=>console.log("DB connection failed"))
 );