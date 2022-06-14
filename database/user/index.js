import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

//schema is the structure of our database

const UserSchema = new mongoose.Schema({
    userName:
    {
        type: String,
    },
    email:
    {
        type: String,
        required: true
    },
    password:
    {
        type: String
    },
   
    profilePic: {
        type: String,
    },
    address: 
    { 
        type: String
    },
    city: 
    {   
        type: String
    },
    },
    {
        timestamps: true
    });

UserSchema.methods.generateJwtToken = function () {
    return jwt.sign({ user: this._id.toString() }, "ZomatoApp", {expiresIn: "8h"});
};

//custom login
UserSchema.statics.findByEmailAndPassword =
    async ({ email, password}) => {
        //check whether user exists
        // const user = await UserModel.findOne({ email }).select("email userName _id address city");
        const user = await UserModel.findOne({ email });
        
        if (!user) {
            throw new Error("User does not exist");
        }
        // compare passwords
        const doesPasswordMatch = await bcrypt.compare(password, user.password);
        if (!doesPasswordMatch) {
            throw new Error("Invalid password");
        }
        return user;
    };


//hashing and salting

UserSchema.pre("save", function (next) {
    const user = this;
    //password is not modified  
    if (!user.isModified("password")) return next();
    //generating bcrypt salt
    bcrypt.genSalt(8, (error, salt) => {
        if (error) return next(error);
        //hashing the password
        bcrypt.hash(user.password, salt, (error, hash) => {
            if (error) return next(error);
            //assigning hashed password
            user.password = hash;
            return next();
        })

    })

});

export const UserModel = mongoose.model("Users", UserSchema);