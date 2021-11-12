import joi from "joi";

export const ValidateUserId = (userId) => {

const Schema = joi.object({
  _id: joi.string().required()
});

return Schema.validateAsync(userId);
};
export const ValidateUser = (userData)=>{
    const Schema = joi.object({       
        userName: joi.string().required().min(4),
        email: joi.string().email(),
        address: joi.array().items(joi.object({detail: joi.string(), for:joi.string()})),
    });

    return Schema.validateAsync(userData);
};