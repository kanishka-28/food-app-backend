import joi from "joi";

export const ValidateSignup = (userData) => {

const Schema = joi.object({
  userName: joi.string().min(2),
  email: joi.string().email(),
  password: joi.string().min(5),
  address: joi.object({detail: joi.string(), city:joi.string()}),
 status: joi.string().required()
});

return Schema.validateAsync(userData);

};
export const ValidateSignin = (userData) => {

const Schema = joi.object({
  userName: joi.string().required(),
  password: joi.string().min(5).required(),
  
});

return Schema.validateAsync(userData);

};