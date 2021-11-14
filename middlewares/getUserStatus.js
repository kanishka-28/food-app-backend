import { verify } from "jsonwebtoken";
import { UserModel } from "../database/user";

const getUserStatus= async (req,res,next)=>{

    //get the user from the jwt token and add id to req object
    try{
    const token = req.header('token');
    if(!token){
        res.status(401).send({error: "please authenticate using a valid token token not found"})
    }
        const data = verify(token, "ZomatoApp");
        // req.user = data.user;
        const result = await UserModel.findById(data.user).select("-password")
        
        req.user= result
        next();

    }
    catch(error){
        res.status(401).send({error: "please authenticate using a valid token",message:error})
    }
}

export default getUserStatus;