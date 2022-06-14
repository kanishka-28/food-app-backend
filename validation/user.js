import joi from "joi";

export const ValidateUserId = (userId) => {

const Schema = joi.object({
  _id: joi.string().required()
});

return Schema.validateAsync(userId);
};
export const ValidateUser = (userData)=>{
    const Schema = joi.object({       
        userName: joi.string().required(),
        email: joi.string().email().required(),
        address: joi.string(),
        city: joi.string(),
        profilePic: joi.string()
    });

    return Schema.validateAsync(userData);
};