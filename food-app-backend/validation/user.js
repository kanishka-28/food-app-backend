import joi from "joi";

export const ValidateUserId = (userId) => {

const Schema = joi.object({
  _id: joi.string().required()
});

return Schema.validateAsync(userId);
};
export const ValidateUser = (userData)=>{
    const Schema = joi.object({  
        _id : joi.string(),     
        userName: joi.string(),
        status: joi.string(),
        email: joi.string().email().required(),
        password: joi.string(),
        address: joi.string(),
        city: joi.string(),
        profilePic: joi.string()
    });

    return Schema.validateAsync(userData);
};