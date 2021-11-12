import joi from "joi";

export const ValidateSignup = (userData) => {

const Schema = joi.object({
  userName: joi.string().min(4),
  email: joi.string().email(),
  password: joi.string().min(5),
  status: joi.string(),
  address: joi.array().items(joi.object({detail: joi.string(), for:joi.string()})),
});

return Schema.validateAsync(userData);

};
export const ValidateSignin = (userData) => {

const Schema = joi.object({
  userName: joi.string().email().required(),
  password: joi.string().min(5).required(),
  
});

return Schema.validateAsync(userData);

};